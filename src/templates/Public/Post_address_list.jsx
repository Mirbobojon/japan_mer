import React, { useEffect, useCallback, useState } from "react"
import { sendConfirm } from '../../reducks/orders/operations'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ApiDir, RouteDir } from "../../common"
import { BreadCrumb, OrderFlow } from '../../components'
import { Paging } from '../../components/UIkit'
import { SiteTitle } from './common'
import queryString from 'query-string';

const DeliveryAddressList = (props) =>
{

  const dispatch = useDispatch()

  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)
  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //お届け先リスト
  const [deliveryAddressList, setDeliveryAddressList] = useState([])

  //検索氏名の入力
  const [nameValue, setNameValue] = useState('')
  const inputNameValue = useCallback((event) =>
  {
    setNameValue(event.target.value)
  }, [setNameValue])


  useEffect(()=>{

    //お届け先情報の取得
    let params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectDeliveryAddressList.php',params)
    .then(function(response){
      console.log(response.data)
      setDeliveryAddressList(response.data)
      return
    })
    .catch(function(error){
      console.log(error)
      return
    })
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(10) //１ページに表示する数

  },[queryParam.paged])

  //お届け先の検索ボタン
  const searchDeleveryAddressBtn = () =>
  {
    let params = new URLSearchParams();
    params.append('name',nameValue);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectDeliveryAddressList.php',params)
    .then(function(response){
      setDeliveryAddressList(response.data)
      return
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }

  // 住所選択時に「決定」ボタンを有効化
  const inputValueCheck = () => {
    document.getElementById('confirm_btn').classList.remove('disabled')
  }

  //一括操作
  const sendConfirmBtn = () =>
  {
    const selectCheckbox = document.querySelectorAll("input[name=select_radio]:checked");
    console.log(selectCheckbox[0].value)
    dispatch(sendConfirm(selectCheckbox[0].value))
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'お届け先リスト',
      href: '/mypage/delivery_address_list'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="delivery_address_list_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="member_edit_content">
          <h1>お届け先リスト</h1>
          <OrderFlow
            activeKey = {1}
          />
          <section className="search_add_area">
            <div className="left_content">
              <div className="search_area">
                <input
                  type = "text"
                  name = {'name'}
                  value = {nameValue}
                  onChange = {inputNameValue}
                  placeholder = {'お名前（フリガナ可）の検索'}
                />
                <button onClick={()=>searchDeleveryAddressBtn()}>検索</button>
              </div>
            </div>
          </section>
          <section className="list_area">
            <div className="scroll_wrap">
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
                {Array.isArray(deliveryAddressList) && deliveryAddressList.map((deliveryAddress, i)=>(
                  (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
                  <tr key={i}>
                    <td className="checkbox_box"><input type="radio" name="select_radio" onClick={() => inputValueCheck()} value={deliveryAddress.id}/></td>
                    <td className="name_box">
                      {deliveryAddress.family_name !== ''?deliveryAddress.family_name:'-'}&ensp;{deliveryAddress.first_name !== ''?deliveryAddress.first_name:'-'}<br/>
                      {deliveryAddress.family_name_furigana !== ''?deliveryAddress.family_name_furigana:'-'}&ensp;{deliveryAddress.first_name_furigana !== ''?deliveryAddress.first_name_furigana:'-'}
                    </td>
                    <td className="address_box">
                      〒{deliveryAddress.postal_code !== ''?deliveryAddress.postal_code:'-'}<br/>
                      {deliveryAddress.address !== ''?deliveryAddress.address:'-'}
                    </td>
                    <td className="telnumber_box">
                      {deliveryAddress.telnumber !== ''?deliveryAddress.telnumber:'-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <p className="sp_txt">横スクロールできます。</p>
          </section>
          <section className="under_menu_area">
            <div className="left_group">
            </div>
            <div className="right_group">
              <Paging
              publicPage = {true}
                length = {deliveryAddressList.length}
                paged = {paged}
                showCount = {showCount}
                prevtext = {'前へ'}
                nexttext = {'次へ'}
                slug = {'mypage/delivery_address_list'}
              />
            </div>
          </section>
          <div className="btn_area">
            <button className="order_post_info_link_btn" onClick={()=>dispatch(push(RouteDir+'/mypage/add_order_post_address'))}>住所入力に戻る</button>
            <button id="confirm_btn" className='add_btn disabled' onClick={()=>sendConfirmBtn()}>決定</button>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default DeliveryAddressList