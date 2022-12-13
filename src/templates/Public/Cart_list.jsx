import React, {useEffect} from "react"
import DocumentMeta from 'react-document-meta'
import { deleteCart, fetchLatestCartInfo } from '../../reducks/carts/operations'
import { itemListLink } from '../../reducks/items/operations'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumb, OrderFlow } from '../../components'
import { SiteTitle } from './common'
import { ImagesDir, RouteDir, ItemImageDir } from '../../common'
import { push } from "connected-react-router"
import { calcItemTaxIncludedPrice } from "../../myLib"

const CartList = () =>
{
  const dispatch = useDispatch()

  const items = useSelector(state => state.carts.list)

  useEffect(() => {
    // 最新のカート情報をサーバから取得（売り切れ確認）
    dispatch(fetchLatestCartInfo())
  }, [])

  const itemListLinkBtn = ()=>
  {
    dispatch(itemListLink())
  }

  const deleteConfirm = (cartId) =>
  {
    const result = window.confirm('買い物カゴから削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteCart(cartId))
    }
    else
    {
      return false
    }
  }

  // 購入手続きへ
  const goToNextPage = () => {
    // 在庫チェック
    for(let i=0; i < items.length; i++) {
      console.log(items[i])
      // console.log(items[i].stock_quantity)
      if(Number(items[i].stock_quantity) === 0 || Number(items[i].quantity) > Number(items[i].stock_quantity)) {
        window.alert("「売り切れ」または「在庫不足」の商品があります。\n売り切れ商品：買い物カゴから削除してください。\n在庫不足商品：数量を在庫数以内に調整してください。")
        return
      }
    }

    dispatch(push(RouteDir+'/mypage/add_order_post_address'))
  }

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

  return(
    <DocumentMeta {...meta}>
      <div id="cart_list_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="cart_list_content">
          <h1>買い物カゴ</h1>
          <OrderFlow
            activeKey = {0}
          />
          {Array.isArray(items) && items.length!==0?
            <>
            <p className="introduction">各商品の数量を確認して「購入手続き」へお進みください。<br/>※ここから先の画面では、画面の再読み込み（リロード）を行わないでください。</p>
            <section className="list_type_2">
              <div className="scroll_wrap">
              <table>
                <thead>
                  <tr>
                    <th className="item_name_th">商品名</th>
                    <th>金額（税込）</th>
                    <th>数量</th>
                    <th className="delete_btn_th">&ensp;</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(items) && items.map((item, i) => (
                    <tr key={i}>
                      <td
                      //  className={Number(item.stock_quantity) === '0'
                      //     ? "item_image_name_box nostock"
                      //     : "item_image_name_box"
                      //   }
                        className = {
                          (()=>{
                            if(Number(item.stock_quantity) <= 0) {
                              return "item_image_name_box nostock"
                            } else if(Number(item.quantity) > Number(item.stock_quantity)) {
                              return "item_image_name_box shortage"
                            } else {
                              return "item_image_name_box"
                            }
                          })()
                        }
                      >
                        <div className="thumbnail_area">
                          <img src={item.path===null?process.env.PUBLIC_URL + '/images/noimage.jpg':ItemImageDir + item.path} alt={item.name} />
                        </div>
                        <div className="item_info">
                          <p className="name">{item.name}</p>
                          <p className="standard">{item.standard}</p>
                          <p className="standard">在庫数：{
                              item.stock_quantity <= 0
                              ? 0
                              : Number(item.stock_quantity).toLocaleString()
                            }
                          </p>
                        </div>
                      </td>
                      <td className="price_box">￥{calcItemTaxIncludedPrice(item.price, item.tax_value).toLocaleString()}</td>
                      <td className="quantity_box">
                        {item.quantity}個
                      </td>
                      <td className="delete_btn_box">
                        <button className="delete_btn" onClick={()=>deleteConfirm(item.cart_id)}>削除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <p className="sp_txt">横スクロールできます。</p>
              <div className="btn_area">
                <button className="item_list_link_btn" onClick={()=>itemListLinkBtn()}>買い物を続ける</button>
                <button className="order_post_info_link_btn" onClick={()=>goToNextPage()}>購入手続きへ</button>
                {/* <button className="order_post_info_link_btn" onClick={()=>dispatch(push(RouteDir+'/mypage/add_order_post_address'))}>購入手続きへ</button> */}
              </div>
            </section>
            </>
          :
          <p>買い物カゴに何も入っていません。</p>
          }
        </main>
      </div>
    </DocumentMeta>
  )
}

export default CartList