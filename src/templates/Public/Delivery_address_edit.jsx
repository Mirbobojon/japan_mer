import React, { useEffect, useCallback, useState } from "react"
import { updateDeliveryAddress } from '../../reducks/members/operations'
import DocumentMeta from 'react-document-meta'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ApiDir, RouteDir, JsDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import importScript from '../../components/hooks/ImportScript'
import { push } from "connected-react-router"

const DeliveryAddressEdit = (props) =>
{
  // svg操作のjsの読み込み
  importScript(JsDir + '/ajaxzip3.js')

  const pageId = props.match.params.id

  const dispatch = useDispatch()

  //姓入力
  const [familyNameValue, setFamilyNameValue] = useState('')
  const inputFamilyNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setFamilyNameValue(event.target.value)
  }, [setFamilyNameValue])

  //名入力
  const [firstNameValue, setFirstNameValue] = useState('')
  const inputFirstNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setFirstNameValue(event.target.value)
  }, [setFirstNameValue])

  //セイ入力
  const [familyNameFuriganaValue, setFamilyNameFuriganaValue] = useState('')
  const inputFamilyNameFuriganaValue = useCallback((event) =>
  {
    inputValueCheck()
    setFamilyNameFuriganaValue(event.target.value)
  }, [setFamilyNameFuriganaValue])

  //メイ入力
  const [firstNameFuriganaValue, setFirstNameFuriganaValue] = useState('')
  const inputFirstNameFuriganaValue = useCallback((event) =>
  {
    inputValueCheck()
    setFirstNameFuriganaValue(event.target.value)
  }, [setFirstNameFuriganaValue])

  //郵便番号入力（編集不可）
  const [postalCodeValue, setPostalcodeValue] = useState('')
  const inputPostalCodeValue = useCallback((event) =>
  {
    setAddress1Value("")
    inputValueCheck()
    setPostalcodeValue(event.target.value)
  }, [setPostalcodeValue])

  //郵便番号入力（編集可能）
  const [postalCodeEditableValue, setPostalCodeEditableValue] = useState('')
  const inputPostalCodeEditableValue = useCallback((event) =>
  {
    setAddress1Value("")
    setTimeout(() => {
      inputValueCheck()
    }, 100);
    setPostalCodeEditableValue(event.target.value)
  }, [setPostalCodeEditableValue])

  //住所（編集不可）
  const [addressValue, setAddressValue] = useState('')
  const inputAddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setAddressValue(event.target.value)
  }, [setAddressValue])

  //住所1入力（編集不可）
  const [address1Value, setAddress1Value] = useState('')
  const inputAddress1Value = useCallback((event) =>
  {
    inputValueCheck()
    setAddress1Value(event.target.value)
  }, [setAddress1Value])
  
  //住所2入力（編集可能）
  const [address2Value, setAddress2Value] = useState('')
  const inputAddress2Value = useCallback((event) =>
  {
    inputValueCheck()
    setAddress2Value(event.target.value)
  }, [setAddress2Value])

  //電話番号入力
  const [telnumberValue, setTelnumberValue] = useState('')
  const inputTelnumberValue = useCallback((event) =>
  {
    inputValueCheck()
    setTelnumberValue(event.target.value)
  }, [setTelnumberValue])


  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const formElem = document.getElementById('update_form');
    for(let i=0; i < formElem.elements.length; i++) {
      const elem = formElem.elements[i];
      if(elem.tagName === "INPUT") {  /* inputタグのみチェック */
        if(elem.hasAttribute("required")) {
          if(elem.value.trim() == "") {
            document.getElementById('update_btn').classList.add('desabled')
            return;
          }
        }
      }
    }
    document.getElementById('update_btn').classList.remove('desabled')
  }

  const [isAddressEditable, setIsAddressEditable] = useState(false) /* 住所編集可能 */

  useEffect(()=>{
    //お届け先情報の取得
    let params = new URLSearchParams();
    params.append('id',pageId);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/SelectDeliveryAddress.php',params)
    .then(function(response){
      setFamilyNameValue(response.data[0].family_name)
      setFirstNameValue(response.data[0].first_name)
      setFamilyNameFuriganaValue(response.data[0].family_name_furigana)
      setFirstNameFuriganaValue(response.data[0].first_name_furigana)
      setPostalcodeValue(response.data[0].postal_code)
      setAddressValue(response.data[0].address)
      setTelnumberValue(response.data[0].telnumber)
      inputValueCheck()
    })
    .catch(function(error){
      console.log(error)
      return
    })
  },[pageId])

  //送信ボタン押下時の処理
  const sendFormData = () =>
  {
    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('id',pageId)
    formData.append('formkey','updatekey')
    dispatch(updateDeliveryAddress(formData))
  }

  //住所自動入力
  const postalAutoInput = ()=>
  {
    const {AjaxZip3} = window
    AjaxZip3.zip2addr('postal_code','','address_1','address_1')
    setTimeout(()=>{
      const address1Element = document.getElementsByName('address_1')
      const address1Value = address1Element[0].value
      setAddress1Value(address1Value)
      inputValueCheck()
    },100)
  }

  // 住所を元に戻す
  const restoreAddress = () => {
    setIsAddressEditable(false);
    setTimeout(()=>{
      inputValueCheck()
    }, 100)
  }

  // 住所を編集可能にする
  const editAddress = () => {
    setIsAddressEditable(true);
    setTimeout(()=>{
      inputValueCheck()
    }, 100)
  }
  
  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'お届け先編集',
      href: '/delivery_address_edit/' + pageId
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="delivery_address_add_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="delivery_address_add_content form_type_1">
          <h1>お届け先編集</h1>
          <p className="introduction">お届け先情報をご入力ください。</p>
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>お届け先お名前<span className="required">必須</span></th>
                  <td>
                    <div className="family_name_area">
                      <span>姓</span>
                      <input
                        type = "text"
                        name = {'family_name'}
                        value = {familyNameValue}
                        onChange = {inputFamilyNameValue}
                        required
                      />
                    </div>
                    <div className="first_name_area">
                      <span>名</span>
                      <input
                        type = "text"
                        name = {'first_name'}
                        value = {firstNameValue}
                        onChange = {inputFirstNameValue}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>フリガナ<span className="required">必須</span></th>
                  <td>
                    <div className="family_name_area">
                      <span>セイ</span>
                      <input
                        type = "text"
                        name = {'family_name_furigana'}
                        value = {familyNameFuriganaValue}
                        onChange = {inputFamilyNameFuriganaValue}
                        required
                      />
                    </div>
                    <div className="first_name_area">
                      <span>メイ</span>
                      <input
                        type = "text"
                        name = {'first_name_furigana'}
                        value = {firstNameFuriganaValue}
                        onChange = {inputFirstNameFuriganaValue}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>郵便番号<span className="required">必須</span></th>
                  <td>
                    〒
                    {isAddressEditable
                      ? <>
                          <input
                            type = "text"
                            name = {'postal_code'}
                            value = {postalCodeEditableValue}
                            onChange = {inputPostalCodeEditableValue}
                            required
                          />
                          <button onClick={()=>postalAutoInput()}>郵便番号から検索</button>
                          <button onClick={()=>restoreAddress()}>住所を元に戻す</button>
                        </>
                      : <>
                          <input
                            type = "text"
                            name = {'postal_code'}
                            className = "read_only"
                            value = {postalCodeValue}
                            onChange = {inputPostalCodeValue}
                            readOnly
                            required
                          />
                          <button onClick={()=>editAddress()}>住所を編集する</button>
                        </>
                    }
                  </td>
                </tr>
                <tr>
                  <th>住所<span className="required">必須</span></th>
                  <td>
                    {isAddressEditable
                      ? <>
                          <input
                            type = "text"
                            name = {'address_1'}
                            value = {address1Value}
                            onChange = {inputAddress1Value}
                            placeholder = {"「郵便番号から検索」を押してください（手動入力はできません）"}
                            readOnly
                            required
                          />
                          <input
                            type = "text"
                            name = {'address_2'}
                            value = {address2Value}
                            onChange = {inputAddress2Value}
                            placeholder = {"続きの住所を入力してください"}
                            required
                          />

                          {/* DB登録用：address_1とaddress_2を文字列結合 */}
                          <input
                            type = "text"
                            name = {'address'}
                            value = {address1Value + address2Value}
                            onChange = {inputAddressValue}
                            readOnly
                            hidden
                            required
                          />
                        </>
                      : <input
                          type = "text"
                          name = {'address'}
                          value = {addressValue}
                          onChange = {inputAddressValue}
                          readOnly
                          required
                        />
                    }
                  </td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>
                    <input
                      type = "text"
                      name = {'telnumber'}
                      value = {telnumberValue}
                      onChange = {inputTelnumberValue}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div className="button_area">
          <button className="back_btn" onClick={()=>dispatch(push(RouteDir + "/mypage/delivery_address_list"))}>一覧に戻る</button>
          <button id = "update_btn" className="desabled" onClick={()=>sendFormData()}>変更する</button>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default DeliveryAddressEdit