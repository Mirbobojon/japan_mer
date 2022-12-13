import React, { useEffect, useCallback, useState } from "react"
import { selectOrderHistoryList } from '../../reducks/orders/operations'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ImagesDir, RouteDir, ItemImageDir } from "../../common"
import { BreadCrumb } from '../../components'
import { Paging } from '../../components/UIkit'
import { SiteTitle } from './common'
import queryString from 'query-string';

const OrderHistory = (props) =>
{

  const dispatch = useDispatch()

  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)
  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //購入履歴リスト
  const orderHistories = useSelector(state => state.orders.history)

  useEffect(()=>{

    //購入履歴の取得
    dispatch(selectOrderHistoryList())

    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(10) //１ページに表示する数

  },[dispatch, queryParam.paged])



  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: '購入履歴',
      href: '/mypage/order_history'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="order_history_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="member_edit_content">
          <h1>購入履歴</h1>
          {Array.isArray(orderHistories) && orderHistories.length!==0?
          <section className="list_area">
            <div className="scroll_wrap">
            <table>
              <thead>
                <tr>
                  <th className="order_date_title">ご注文日</th>
                  <th>商品名</th>
                  <th>数量</th>
                  {/* <th>小計（税込）</th> */}
                  <th>再注文</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderHistories) && orderHistories.map((order, i)=>(
                  (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
                  <tr key={i}>
                    <td className="order_date">
                      <div>
                        <span className="datetime">{
                          order.insert_datetime.substring(0, order.insert_datetime.indexOf(" "))
                        }</span>
                        {/* <span className="order_number">ご注文番号&ensp;{order.order_number}</span> */}
                      </div>
                    </td>
                    <td>
                      <div className="item_info">
                        {/* <div className="thumbnail_area" style={order.path!==null?{backgroundImage:`url('${ItemImageDir}${order.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}></div> */}
                        <div className="thumbnail_area">
                          {order.path !== null
                            ? <img src={ItemImageDir + order.path} alt="商品画像"/>
                            : <img src={process.env.PUBLIC_URL + "/images/noimage.jpg"} alt="商品画像"/>
                          }
                        </div>
                        <div className="itemName_area">
                          <span>商品番号&ensp;{order.item_serial}</span>
                          <span>{order.name}</span>
                          <span>{order.standard}</span>
                        </div>
                      </div>
                    </td>
                    <td>{order.quantity}</td>
                    {/* <td>¥&ensp;{Number(order.price).toLocaleString()}</td> */}
                    <td>
                      <button onClick={()=>dispatch(push(RouteDir+'/item/detail/'+order.item_id))}>再注文する</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <p className="sp_txt">横スクロールできます。</p>
          </section>
          :
          <p>購入履歴がありません。</p>
          }
          <section className="under_menu_area">
            <div className="left_group">
            </div>
            <div className="right_group">
              <Paging
              publicPage = {true}
                length = {orderHistories.length}
                paged = {paged}
                showCount = {showCount}
                prevtext = {'前へ'}
                nexttext = {'次へ'}
                slug = {'mypage/order_history'}
              />
            </div>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default OrderHistory