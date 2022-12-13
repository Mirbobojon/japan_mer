import React, { useCallback, useState } from "react"
import { insertDeliveryAddress } from '../../reducks/members/operations'
import DocumentMeta from 'react-document-meta'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir, JsDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import importScript from '../../components/hooks/ImportScript'
import { useEffect } from "react"
import { push } from "connected-react-router"

const DeliveryAddressAdd = (props) =>
{
  // svg操作のjsの読み込み
  importScript(JsDir + '/ajaxzip3.js')

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

  //郵便番号入力
  const [potalCodeValue, setPostalcodeValue] = useState('')
  const inputPostalCodeValue = useCallback((event) =>
  {
    setAddress1Value("")
    setTimeout(() => {
      inputValueCheck()
    }, 100);
    setPostalcodeValue(event.target.value)
  }, [setPostalcodeValue])

  //住所1入力（編集不可部分）
  const [address1Value, setAddress1Value] = useState('')
  const inputAddress1Value = useCallback((event) =>
  {
    inputValueCheck()
    setAddress1Value(event.target.value)
  }, [setAddress1Value])
  
  //住所2入力（編集可能部分）
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
    const formElem = document.getElementById('insert_form');
    for(let i=0; i < formElem.elements.length; i++) {
      const elem = formElem.elements[i];
      if(elem.tagName === "INPUT") {  /* inputタグのみチェック */
        if(elem.hasAttribute("required")) {
          if(elem.value.trim() == "") {
            document.getElementById('insert_btn').classList.add('desabled')
            return;
          }
        }
      }
    }
    document.getElementById('insert_btn').classList.remove('desabled')
  }

  //送信ボタン押下時の処理
  const sendFormData = () =>
  {
    //form情報の取得
    const formElement = document.getElementById('insert_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','insertkey')
    dispatch(insertDeliveryAddress(formData))
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
  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'お届け先新規登録',
      href: '/delivery_address_add'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="delivery_address_add_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="delivery_address_add_content form_type_1">
          <h1>お届け先新規登録</h1>
          <p className="introduction">追加したいお届け先情報をご入力ください。</p>
          <form encType="multipart/form-data" method="post" id="insert_form" onSubmit={(e)=>e.preventDefault()}>
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
                    <input
                      type = "text"
                      name = {'postal_code'}
                      value = {potalCodeValue}
                      onChange = {inputPostalCodeValue}
                      required
                    />
                    <button onClick={()=>postalAutoInput()}>郵便番号から検索</button>
                  </td>
                </tr>
                <tr>
                  <th>住所<span className="required">必須</span></th>
                  <td>
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
                      hidden
                      required
                    />
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
          <button className="back_btn" onClick={()=> dispatch(push(RouteDir + "/mypage/delivery_address_list"))}>一覧に戻る</button>
          
          <button id = "insert_btn" className="desabled" onClick={()=>sendFormData()}>追加する</button>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default DeliveryAddressAdd