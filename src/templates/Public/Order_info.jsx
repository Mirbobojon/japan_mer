import React, { useEffect, useCallback, useState } from "react"
import DocumentMeta from 'react-document-meta'
import { InsertPayType } from '../../reducks/orders/operations'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumb, OrderFlow } from '../../components'
import { SiteTitle } from './common'
import axios from 'axios'
import { ApiDir, RouteDir } from '../../common'
import { push } from "connected-react-router"


const OrderInfo = () =>
{
  const dispatch = useDispatch()

  const [payTypes, setPayTypes] = useState([])

  //メルマガ配信希望入力
  const [payTypeName, setPayTypeName] = useState('')
  const [payTypeValue, setPayTypeValue] = useState('1')
  const inputPayTypeValue = useCallback((event) =>
  {
    setPayTypeName(event.target.dataset.name)
    setPayTypeValue(event.target.value)
  }, [setPayTypeValue])

  useEffect(()=>{
    //支払い方法情報の取得
    let params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectPayType.php',params)
    .then(function(response){
      setPayTypeName(response.data[0]['name'])
      setPayTypeValue(response.data[0]['id'])
      setPayTypes(response.data)
    })
    .catch(function(error){
      console.log(error)
      return
    })
  },[dispatch])

  const InsertPayTypeBtn = () =>
  {
    dispatch(InsertPayType(payTypeValue, payTypeName))
    dispatch(push(RouteDir+'/mypage/order_confirm'))
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
      <div id="order_info_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="order_info_content">
          <h1>お支払方法の入力</h1>
          <OrderFlow
            activeKey = {2}
          />
          <p className="introduction">お支払方法を指定してください。
          </p>
          <section className="form_type_1">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>お支払方法</th>
                  <td>
                    {Array.isArray(payTypes) && payTypes.map((paytype, i)=>(
                      <label className="radio_btn_label" key={i}>
                        <input
                          type="radio"
                          name="pay_type"
                          value={paytype.id}
                          checked = {payTypeValue === paytype.id}
                          onChange = {inputPayTypeValue}
                          data-name = {paytype.name}
                        />{paytype.name}
                      </label>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="btn_area">
              <button className="order_post_info_link_btn" onClick={()=>dispatch(push(RouteDir+'/mypage/order_post_info'))}>お客様情報入力へ戻る</button>
              <button className="order_confirm_link_btn" onClick={()=>InsertPayTypeBtn()}>内容確認</button>
            </div>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default OrderInfo