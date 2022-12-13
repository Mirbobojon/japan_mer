import React, { useEffect, useCallback, useState } from "react"
import DocumentMeta from 'react-document-meta'
import { insertOrderTemp } from '../../reducks/orders/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumb, OrderFlow } from '../../components'
import PaymentPage from "../../components/public/PaymentPage"
import { SiteTitle } from './common'
import axios from 'axios'
import { push } from "connected-react-router"
import {
  HomeUrl,
  postUrl,
  merchantId,
  merchantName,
  // copyRight,
  ApiDir,
  RouteDir,
  ItemImageDir,
} from '../../common'
import { calcItemTaxIncludedPrice } from "../../myLib"


const OrderConfirm = () => {
  const dispatch = useDispatch()

  //ローディング
  const loading = useSelector(state => state.pageInfos.loading)

  //注文情報
  const orders = useSelector(state => state.orders.list)
  const payType = useSelector(state => state.orders.payType)
  const members = useSelector(state => state.members)

  //注文商品情報
  const items = useSelector(state => state.carts.list)

  //お届け先
  const postAddress = useSelector(state => state.orders.postAddress)

  //商品合計
  const [totalItemPrice, setTotalItemPrice] = useState(0)
  const [isTotalItemPriceCalcEnd, setIsTotalItemPriceCalcEnd] = useState(false)

  //送料合計
  const [totalPostage, setTotalPostage] = useState(0)

  //手数料
  const [commission, setCommission] = useState(0)

  //決済ID
  const [paymentId, setPaymentId] = useState('')

  //ハッシュ値
  const [hash, setHash] = useState('')

  //決済IDの生成
  const getDateTime = () => {
    const toDoubleDigites = (num) => {
      let number = String(num)
      if (number.length === 1) {
        number = '0' + number
      }
      return number
    }
    const date = new Date()
    const datetime = String(date.getFullYear()) + toDoubleDigites(date.getMonth() + 1) + toDoubleDigites(date.getDate()) + toDoubleDigites(date.getHours()) + toDoubleDigites(date.getMinutes()) + toDoubleDigites(date.getSeconds())
    return datetime
  }

  useEffect(()=> {
    // リロードするとストアの値が消えるため、もう一度お届け先入力画面に戻す
    if (postAddress[0].family_name === "") {
      alert("画面が再読み込みされました。\n再度お届け先情報を入力してください。");
      dispatch(push(RouteDir + '/mypage/add_order_post_address'))
    }
    
    //ローディング開始
    dispatch(changeLoading(true))

    // リロード時にアラートを表示
    const showReloadAlert = (e) => {
      e.preventDefault();
      e.returnValue = ""; // アラートに任意のメッセージを表示することはできない（ブラウザ仕様）
    }
    window.addEventListener('beforeunload', showReloadAlert)

    // クリーンアップ処理
    return () => {
      dispatch(changeLoading(false))
      window.removeEventListener('beforeunload', showReloadAlert)
    }
  }, [])

  useEffect(() => {
    // const test =() => {
    //   let totalPrice = 0
    //   let debugText = ""
    //   for(let i=0; i<2000; i++){
    //     const itemPrice = Number(i)  /* 商品税抜き価格 */
    //     const taxRate = Number(8)  /* 消費税率 */
    //     const shippingFee = Number(1000)  /* 送料 */
    //     const additionalShippingFee = Number(2000)  /* 離島配送料 */
    //     const quantity = Number(3)  /* 注文個数 */
    //     const tax = itemPrice * (taxRate / 100)

    //     const taxIncludedItemPriceRaw = itemPrice * (1 + (taxRate / 100)) /* 商品税込価格（小数点第2位以降切り捨て前） */
    //     const taxIncludedItemPriceTruncated = truncateDecimal(itemPrice * (1 + (taxRate / 100))) /* 商品税込価格（小数点第2位以降切り捨て後） */
    //     const taxIncludedItemPriceFloor = Math.floor(taxIncludedItemPriceTruncated)
    //     const taxIncludedItemPriceCeil = Math.ceil(taxIncludedItemPriceTruncated)
    //     const taxIncludedItemPriceRound = Math.round(taxIncludedItemPriceTruncated)

    //     // 切り捨て・四捨五入・切り上げ選択
    //     const taxIncludedItemPrice = taxIncludedItemPriceFloor
    //     // const taxIncludedItemPrice = taxIncludedItemPriceRound
    //     // const taxIncludedItemPrice = taxIncludedItemPriceCeil

    //     const subTotal = (taxIncludedItemPrice * quantity) + shippingFee 
    //     totalPrice =  totalPrice + subTotal

    //     // debugText += "・商品一つ当たりの税込価格計算処理\n"
    //     debugText += "商品税抜き価格：￥" + itemPrice + "\n"
    //     // debugText += "消費税率：" + taxRate + "%\n"
    //     debugText += "消費税：￥" + tax + "\n"
    //     debugText += "商品税込価格（小数点第2位以降切り捨て前）：￥" + taxIncludedItemPriceRaw + "\n"
    //     debugText += "商品税込価格（小数点第2位以降切り捨て後）：￥" + taxIncludedItemPriceTruncated + "\n"
    //     // debugText += "\n"
    //     debugText += "商品税込価格（切り捨て）：￥" + taxIncludedItemPriceFloor + "\n"
    //     debugText += "商品税込価格（四捨五入）：￥" + taxIncludedItemPriceRound + "\n"
    //     debugText += "商品税込価格（切り上げ）：￥" + taxIncludedItemPriceCeil + "\n"
    //     // debugText += "\n"
    //     // debugText += "・数量・送料加算後計算処理\n"
    //     // debugText += "数量：" + quantity + "\n"
    //     // debugText += "送料：￥" + shippingFee + "\n"
    //     debugText += "カート1項目あたりの金額：￥" + subTotal + " (商品税込価格 × 数量) ＋ 送料\n"
    //     debugText += "---------------------------\n"
    //   }
    //   document.getElementById("debug").innerText = debugText;
    // }

    // test();

    // let debugText = "";

    // 合計金額計算処理
    const totalPriceClac = (items) => {
      const itemCount = items.length
      let totalPrice = 0
      for (let i = 0; i < itemCount; i++) {
        const shippingFee = Number(items[i].postage)  /* 送料 */
        const quantity = Number(items[i].quantity)  /* 注文個数 */
        const taxIncludedItemPrice = calcItemTaxIncludedPrice(items[i].price, items[i].tax_value)
        const subTotal = (taxIncludedItemPrice * quantity) + shippingFee
        totalPrice = totalPrice + subTotal

        // debugText += "・商品一つ当たりの税込価格計算処理\n"
        // debugText += "商品税抜き価格：￥" + itemPrice + "\n"
        // debugText += "消費税率：" + taxRate + "%\n"
        // debugText += "消費税：￥" + tax + "\n"
        // debugText += "商品税込価格（小数点第2位以降切り捨て前）：￥" + taxIncludedItemPriceRaw + "\n"
        // debugText += "商品税込価格（小数点第2位以降切り捨て後）：￥" + taxIncludedItemPriceTruncated + "\n"
        // debugText += "\n"
        // debugText += "商品税込価格：￥" + taxIncludedItemPrice + "\n"
        // debugText += "\n"
        // debugText += "・数量・送料加算後計算処理\n"
        // debugText += "数量：" + quantity + "\n"
        // debugText += "送料：￥" + shippingFee + "\n"
        // debugText += "カート1項目あたりの金額：￥" + subTotal + " (商品税込価格 × 数量) ＋ 送料\n"
        // debugText += "---------------------------\n"
      }
      // debugText += "合計金額：￥" + totalPrice.toLocaleString() + "\n"
      // document.getElementById("debug").innerText = debugText;

      const additionalShippingFee = Number(postAddress[0].additionalShippingFee);
      return totalPrice + additionalShippingFee;  /* 商品合計価格＋離島配送料（離島のみ） */
    }
    // console.log(items)

    const calcResult = totalPriceClac(items)
    setTotalItemPrice(calcResult)
    setIsTotalItemPriceCalcEnd(true)
  }, [items])

  useEffect(() => {
    if(isTotalItemPriceCalcEnd) {
      dispatch(changeLoading(false))
    } else {
      dispatch(changeLoading(true))
    }
  }, [isTotalItemPriceCalcEnd])
  

  // const OrderDecideBtn = () => {
  //   console.log(paymentId)
  // }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
    [
      {
        name: '買い物カゴ',
        href: '/mypage/cart_list'
      }
    ]

  return (
    <DocumentMeta {...meta}>
      <div id="order_confirm_page">
        <BreadCrumb
          floors={Floors}
        />
        <main className="order_confirm_content">
          {/* <p id="debug">test</p> */}
          <h1>ご入力内容の確認</h1>
          <OrderFlow
            activeKey={2}
          />
          <section className="list_type_4">
            <div className="order_info_list">
              <div className="order_card_box">
                <h2>注文情報</h2>
                <div className="list_type_2">
                  <table>
                    <thead>
                      <tr>
                        <th className="item_name_th">商品名</th>
                        <th>金額（税込）</th>
                        <th>送料</th>
                        <th>数量</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(items) && items.map((item, i) => (
                        <tr key={i}>
                          <td className="item_image_name_box">
                            <div className="thumbnail_area">
                              <img src={item.path === null ? process.env.PUBLIC_URL + '/images/noimage.jpg' : ItemImageDir + item.path} alt={item.name} />
                            </div>
                            <div className="item_info">
                              <p className="name">{item.name}</p>
                              <p className="standard">{item.standard}</p>
                            </div>
                          </td>
                          <td className="price_box">￥{calcItemTaxIncludedPrice(item.price, item.tax_value).toLocaleString()}</td>
                          <td className="postage_box">
                            ￥{Number(item.postage).toLocaleString()}
                          </td>
                          <td className="quantity_box">
                            {item.quantity}個
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {Number(postAddress[0].additionalShippingFee) !== 0 &&
                    <table id="additional_shipping_fee_table">
                      <th>離島配送料</th>
                      <tr>
                        <td className="additional_shipping_fee">￥{Number(postAddress[0].additionalShippingFee).toLocaleString()}</td>
                      </tr>
                    </table>
                  }
                </div>
                <div className="order_card">
                  <dl>
                    <dt>お届け先</dt>
                    <dd>
                      <p>{postAddress[0].family_name}　{postAddress[0].first_name} 様</p>
                      <p>〒{postAddress[0].postal_code.slice(0, 3)}-{postAddress[0].postal_code.slice(-4)}<br />
                        {postAddress[0].address
                          ? postAddress[0].address
                          : postAddress[0].address_1 + postAddress[0].address_2
                        }
                      </p>
                      <p>{postAddress[0].telnumber}</p>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="total_price_box">
                <h2>お支払金額</h2>
                {/* <dl>
                  <dt>商品合計</dt>
                  <dd>¥{totalItemPrice.toLocaleString()}</dd>
                </dl> */}
                {/* <dl>
                  <dt>送料</dt>
                  <dd>¥{totalPostage.toLocaleString()}</dd>
                </dl> */}
                {/* <dl>
                  <dt>手数料</dt>
                  <dd>¥{commission.toLocaleString()}</dd>
                </dl> */}
                <dl>
                  <dt>合計</dt>
                  <dd className="total_price">¥{totalItemPrice.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
            <div className="payment_area">
              <h2>クレジットカード決済</h2>
              {isTotalItemPriceCalcEnd
                ? <PaymentPage
                  procedure={''}
                  totalPrice={totalItemPrice}
                  memberId={members.member_id}
                  items={items}
                  deliveryFamilyName={postAddress[0].family_name}
                  deliveryFirstName={postAddress[0].first_name}
                  deliveryFamilyNameFurigana={postAddress[0].family_name_furigana}
                  deliveryFirstNameFurigana={postAddress[0].first_name_furigana}
                  deliveryPostalCode={postAddress[0].postal_code}
                  deliveryAddress={postAddress[0].address
                    ? postAddress[0].address
                    : postAddress[0].address_1 + postAddress[0].address_2
                  }
                  deliveryTelnumber={postAddress[0].telnumber}
                />
                : "お待ちください..."
              }
            </div>
            <div className="btn_area">
              <button className="order_info_link_btn" onClick={() => dispatch(push(RouteDir + '/mypage/add_order_post_address'))}>お届け先入力へ戻る</button>
              {/* <button className="order_decide_btn" onClick={()=>OrderDecideBtn()}>決済する</button> */}
            </div>
          </section>
        </main>
      </div>
      <div id="loading_area" className={loading === true ? '' : 'hidden'}>
        <div className="loader">Loading...</div>
      </div>
    </DocumentMeta>
  )
}

export default OrderConfirm