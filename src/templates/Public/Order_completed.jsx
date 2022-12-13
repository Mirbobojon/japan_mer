import React, { useEffect, useState } from "react"
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir } from "../../common"
import { OrderFlow } from '../../components'
import { SiteTitle } from './common'
import { InsertOrderPostInfo, InsertPayType, selectOrderListforTradingId } from "../../reducks/orders/operations"
import { insertDeliveryAddressAfterShopping } from "../../reducks/members/operations"
import { selectCartList } from "../../reducks/carts/operations"

const OrderCompleted = (props) =>
{
  //支払い取引IDをURLパラメータから取得
  const tradingId = props.match.params.trading_id

  const dispatch = useDispatch()

  const orders = useSelector(state => state.orders.list)

  const [popupFlag, setPopupFlag] = useState(false)

  useEffect(()=>{
    //支払い取引IDから宛先を取得
    dispatch(selectOrderListforTradingId(tradingId))

    //stateのカート情報の削除
    dispatch(selectCartList([]))
    dispatch(InsertPayType(''))

  },[dispatch, tradingId])

  const meta =
  {
    title: SiteTitle,
  }

  const goBackTopPageBtn = () =>
  {
    //お届けリストに自宅以外の情報があるか調べる
    const checkAddressFlag = ()=>
    {
      let addressFlag = false
      const orderCount = orders.length
      const checkAddress = () =>
      {
        for(let i=0;i<orderCount;i++)
        {
          if(orders[i]['myhouse_flag'] === '0')
          {
            addressFlag = true
          }
        }
        return addressFlag
      }
      return checkAddress()
    }
    if(checkAddressFlag()===true)
    {
      setPopupFlag(true)
    }
    else
    {
      console.log('noaddress')
      // dispatch(push(RouteDir))
    }
  }

  const addBtn = ()=>
  {
    const selectCheckbox = document.querySelectorAll("input[name=select_checkbox]:checked");
    let insertDeliveryAddressValue = [];
    const checkboxValue = () =>
    {
      if(selectCheckbox)
      {
        for(let i=0;i<selectCheckbox.length;i++)
        {
          for(let k=0;k<orders.length;k++)
          {
            if(orders[k]['id']===selectCheckbox[i].value)
            {
              insertDeliveryAddressValue.push(orders[k])
            }
          }
        }
        return insertDeliveryAddressValue
      }
    }
    dispatch(insertDeliveryAddressAfterShopping(checkboxValue()))
  }

  const noAddBtn = ()=>
  {
    console.log('noadd')
    InsertOrderPostInfo([])
    dispatch(push(RouteDir))
  }

  return(
    <DocumentMeta {...meta}>
      <div id="order_completed_page">
        <main className="order_completed_content">
          <h1>ご注文が完了しました</h1>
          <OrderFlow
            activeKey = {3}
          />
          <div className="text_area">
            <p>
              ご注文ありがとうございます。<br/>
              確認のためのメールを送信しましたので、ご確認ください。
            </p>
            <p>
              しばらくしても、ご注文完了メールが届かない場合は<span className="link_btn" onClick={()=>dispatch(push(RouteDir+'/contact'))}>お問い合わせフォーム</span>か<span className="telnumber">お電話</span>にてお問い合わせください。
            </p>
          </div>
          <div className="button_area">
          <button id = "top_page_link_btn" onClick={()=>dispatch(push(RouteDir))}>トップページに戻る</button>
          </div>
        </main>
        {popupFlag === true &&   //ポップアップ部分
          <div className="popup_area">
            <div className="shadow_wrap">
              <div className="popup_content list_area">
                <h2>今回のお届け先をお届け先リストに追加しますか？</h2>
                <table>
                  <thead>
                    <tr>
                      <th>選択</th>
                      <th>お名前</th>
                      <th>住所</th>
                      <th>電話番号</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(orders) && orders.map((order, i)=>(
                      order.myhouse_flag !== '1' &&
                      <tr key={i}>
                        <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={order.id}/></td>
                        <td className="name_box">
                          {order.delivery_family_name !== ''?order.delivery_family_name:'-'}&ensp;{order.first_name !== ''?order.delivery_first_name:'-'}
                        </td>
                        <td className="address_box">
                          〒{order.delivery_postal_code !== ''?order.delivery_postal_code:'-'}<br/>
                          {order.delivery_address !== ''?order.delivery_address:'-'}
                        </td>
                        <td className="telnumber_box">
                          {order.delivery_telnumber !== ''?order.delivery_telnumber:'-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btn_area">
                <button className="add_btn" onClick={()=>addBtn()}>追加</button>
                <button className='no_add_btn' onClick={()=>noAddBtn()}>追加しない</button>
              </div>
              </div>
            </div>
          </div>
        }
      </div>
    </DocumentMeta>
  )
}

export default OrderCompleted