import React, { useEffect, useCallback, useState } from "react"
import { bulkOperationDeliveryAddress, deleteDeliveryAddress, searchDeleveryAddress } from '../../reducks/members/operations'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ApiDir, RouteDir } from "../../common"
import { BreadCrumb } from '../../components'
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

  //一括操作の入力
  const [bulkOperation, setBulkOperation] = useState('')
  const inputBulkOperation = useCallback((event) =>
  {
    setBulkOperation(event.target.value)
  }, [setBulkOperation])



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


  //お届け先情報の削除
  const deleteConfirm = (Id) =>
  {
    const result = window.confirm('お届け先情報を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteDeliveryAddress(Id))
    }
    else
    {
      return false
    }
  }

  //一括操作
  const bulkOperationBtn = () =>
  {
    const selectValue = document.getElementById('select_bulk_operation').value;
    const selectCheckbox = document.querySelectorAll("input[name=select_checkbox]:checked");
    let selectCheckboxValue = [];
    if(selectCheckbox)
    {
      for(let i=0;i<selectCheckbox.length;i++)
      {
        selectCheckboxValue.push(selectCheckbox[i].value)
      }
    }
    dispatch(bulkOperationDeliveryAddress(selectValue, selectCheckboxValue))
  }

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
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
            <div className="right_content">
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(RouteDir+'/mypage/delivery_address_add'))}>新規登録</button>
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
                  <th>編集<br />削除</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(deliveryAddressList) && deliveryAddressList.map((deliveryAddress, i)=>(
                  (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
                  <tr key={i}>
                    <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={deliveryAddress.id}/></td>
                    <td className="name_box">
                      {deliveryAddress.family_name !== ''?deliveryAddress.family_name:'-'}&ensp;{deliveryAddress.first_name !== ''?deliveryAddress.first_name:'-'}
                    </td>
                    <td className="address_box">
                      〒{deliveryAddress.postal_code !== ''?deliveryAddress.postal_code:'-'}<br/>
                      {deliveryAddress.address !== ''?deliveryAddress.address:'-'}
                    </td>
                    <td className="telnumber_box">
                      {deliveryAddress.telnumber !== ''?deliveryAddress.telnumber:'-'}
                    </td>
                    <td className="button_box">
                      <button className="update_btn" onClick={()=>{window.location = RouteDir + '/mypage/delivery_address_edit/' + deliveryAddress.id}}>編集</button>
                      <button className="delete_btn" onClick={()=>deleteConfirm(deliveryAddress.id)}>削除</button>
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
              <div>
                <select
                  id = "select_bulk_operation"
                  name = "bulk_operation"
                  value = {bulkOperation}
                  onChange = {inputBulkOperation}
                >
                  <option value="">一括操作</option>
                  <option value="delete">削除</option>
                </select>
              </div>
              <div>
                <button onClick={()=>bulkOperationBtn()}>適用</button>
              </div>
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
        </main>
      </div>
    </DocumentMeta>
  )
}

export default DeliveryAddressList