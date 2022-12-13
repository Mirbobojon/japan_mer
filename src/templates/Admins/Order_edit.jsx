import React, { useCallback, useEffect, useState } from "react"
import { selectOrder, updateOrder } from '../../reducks/orders/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import { useDispatch, useSelector } from 'react-redux'
import { push } from "connected-react-router"
import { RouteDir } from "../../common"


const OrderEdit = (props) =>
{
  //URLから注文IDの取得
  const pageOrderId = props.match.params.id

  const dispatch = useDispatch()

  const order = useSelector(state => state.orders.selectOrder)

  //ローディング
  const loading = useSelector(state => state.pageInfos.loading)

  //状況の入力
  const [status, setStatus] = useState(order.status)
  const inputStatus = useCallback((event) =>
  {
    setStatus(event.target.value)
  }, [setStatus])


  useEffect(()=>
  {
    dispatch(selectOrder(pageOrderId))
    setStatus(order.status)
  },[dispatch, pageOrderId, order.status])

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    //ローディング開始
    dispatch(changeLoading(true))

    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //注文IDの追加
    formData.append('order_id',pageOrderId)

    //formkeyの追加
    formData.append('formkey','updatekey')
    dispatch(updateOrder(formData))
  }
  const options = [
    // {id:1, name:'入金待ち'},
    {id:2, name:'支払済み'},
    {id:3, name:'キャンセル'},
  ]

  return(
    <>
    <main id="member_edit_page">
      <h2 className="page_title"><span>受注・配送詳細</span></h2>
      <section className="box_type_1">
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
          <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>注文日</th>
                  <td>{order.insert_datetime}</td>
                </tr>
                {/* <tr>
                  <th>状況</th>
                  <td>
                    <select
                      name = "status"
                      value = {status}
                      onChange = {inputStatus}
                    >
                      {Array.isArray(options) && options.map((option,i)=>(
                        <option key={i} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </td>
                </tr> */}
                <tr>
                  <th>注文者情報</th>
                  <td>
                    <span>氏名：{order.family_name}&ensp;{order.first_name}&ensp;様</span><br/><br/>
                    <span>電話番号：
                      {order.telnumber !== ""
                        ? order.telnumber
                        : "-"
                      }
                    </span><br/>
                  </td>
                </tr>
                <tr>
                  <th>お届け先情報</th>
                  <td>
                    <span>氏名：{order.delivery_family_name}&ensp;{order.delivery_first_name}&ensp;様</span><br/><br/>
                    <span>住所<br/>〒{order.delivery_postal_code}</span><br/>
                    <span>{order.delivery_address}</span><br/><br/>
                    <span>電話番号：
                      {order.delivery_telnumber !== ""
                        ? order.delivery_telnumber
                        : "-"
                      }
                    </span><br/>
                  </td>
                </tr>
                <tr>
                  <th>注文内容</th>
                  <td>
                    <span>注文番号：{order.order_number}</span><br/>
                    <span>商品番号：{order.item_serial}</span><br/>
                    <span>商品名：{order.item_name}</span><br/>
                    <span>規格：{order.standard}</span><br/>
                    <span>個数：{order.quantity}</span><br/>
                    {/* <span>合計金額：¥{order.price}</span><br/> */}
                  </td>
                </tr>
                <tr>
                  <th>担当部署</th>
                  <td>{order.department_name}</td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="button_area">
          {/* <button id = "insert_btn" onClick={()=>sendFormData()}>登録</button> */}
          <button id = "back_btn" onClick={()=>dispatch(push(RouteDir+'/admin/orders/list'))}>一覧に戻る</button>
        </div>
      </section>
    </main>
    <div id="loading_area" className={loading===true?'':'hidden'}>
      <div className="loader">Loading...</div>
    </div>
    </>
  )
}

export default OrderEdit