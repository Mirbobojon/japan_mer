import React, { useEffect, useCallback, useState } from "react"
import { changeMemberPasswordProcess, updateMemberForPublic } from '../../reducks/members/operations'
import {changeLoadingAction} from '../../reducks/pageInfos/actions'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ApiDir, RouteDir, JsDir, REGEX_BIRTHDAY, REGEX_TEL_NUMBER } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import importScript from '../../components/hooks/ImportScript'
import { isMailAddressValid } from "../../myLib"


const Signup = (props) =>
{
  // 郵便番号情報の読み込み
  importScript(JsDir + '/ajaxzip3.js')

  const dispatch = useDispatch()
  const [currentMailAddress, setCurrentMailAddress] = useState('')

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

  //メールアドレス入力
  const [mailAddressValue, setMailAddressValue] = useState('')
  const inputMailAddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailAddressValue(event.target.value)
  }, [setMailAddressValue])

  //メールアドレス入力
  const [reMailAddressValue, setReMailAddressValue] = useState('')
  const inputReMailAddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setReMailAddressValue(event.target.value)
  }, [setReMailAddressValue])

  //生年月日入力
  const [birthdayValue, setBirthdayValue] = useState('')
  const inputBirthdayValue = useCallback((event) =>
  {
    inputValueCheck()
    setBirthdayValue(event.target.value)
  }, [setBirthdayValue])

  //郵便番号入力（編集不可）
  const [postalCodeValue, setPostalCodeValue] = useState('')
  const inputPostalCodeValue = useCallback((event) =>
  {
    setAddress1Value("")
    inputValueCheck()
    setPostalCodeValue(event.target.value)
  }, [setPostalCodeValue])

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

  //メルマガ配信希望入力
  const [mailMagazineFlagValue, setMailMagazineFlagValue] = useState('1')
  const inputMailMagazineFlagValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailMagazineFlagValue(event.target.value)
  }, [setMailMagazineFlagValue])

  const [isAddressEditable, setIsAddressEditable] = useState(false) /* 住所編集可能 */

  useEffect(()=>{
    //会員情報の取得
    let params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectMyMemberInfo.php',params)
    .then(function(response){
      console.log(response.data)
      setFamilyNameValue(response.data[0].family_name)
      setFirstNameValue(response.data[0].first_name)
      setFamilyNameFuriganaValue(response.data[0].family_name_furigana)
      setFirstNameFuriganaValue(response.data[0].first_name_furigana)
      setMailAddressValue(response.data[0].mail_address)
      setCurrentMailAddress(response.data[0].mail_address)
      if(response.data[0].birthday!==null)
      {
        setBirthdayValue(response.data[0].birthday)
      }
      setPostalCodeValue(response.data[0].postal_code)
      setAddressValue(response.data[0].address)
      setTelnumberValue(response.data[0].telnumber)
      setMailMagazineFlagValue(response.data[0].mail_magazine_flag)
    })
    .catch(function(error){
      console.log(error)
      return
    })

  },[])


  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const formElem = document.getElementById('update_form');
    for(let i=0; i < formElem.elements.length; i++) {
      const elem = formElem.elements[i];
      console.log(elem)
      if(elem.tagName === "INPUT") {  /* inputタグのみチェック */
        if(elem.hasAttribute("required")) {
          if(elem.value.trim() === "") {
            document.getElementById('send_btn').classList.add('desabled')
            return;
          }
          if(elem.name === "agree" && elem.checked === false) {
            document.getElementById('send_btn').classList.add('desabled')
            return;
          }
        }
      }
    }
    document.getElementById('send_btn').classList.remove('desabled')
  }

  //送信ボタン押下時の処理
  const sendFormData = () =>
  {
    if(telnumberValue !== "") {
      if(!REGEX_TEL_NUMBER.test(telnumberValue)) {
        window.alert("電話番号を正しく入力してください。")
        return
      }
    }

    if(birthdayValue !== "") {
      if(!REGEX_BIRTHDAY.test(birthdayValue)) {
        window.alert("生年月日を正しく入力してください。")
        return
      }
    }

    // メールアドレス要件を満たしているか検証
    if(!isMailAddressValid(mailAddressValue)) {
      window.alert("メールアドレスを正しく入力してください。")
      return
    }
    
    if(mailAddressValue !== reMailAddressValue) {
      window.alert('メールアドレスが一致していません。')
      return
    }

    // 住所入力チェック（郵便番号,住所1,住所2：全項目入力 or 全項目未入力）
    if(isAddressEditable) {
      if(!((postalCodeEditableValue === "" && address1Value === "" && address2Value === "") || (postalCodeEditableValue !== "" && address1Value !== "" && address2Value !== ""))) {
        window.alert('郵便番号・住所を入力する場合は正しく入力してください。')
        return
      }
    }

    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    // 住所入力チェック（郵便番号,住所1,住所2：全項目入力 or 全項目未入力）
    // console.log("test", isAddressEditable)
    // if(isAddressEditable) {
    //   const inputValueOfPostalCode = document.getElementsByName('postal_code')
    //   const inputValueOfAddress1 = document.getElementsByName('address_1')
    //   const inputValueOfAddress2 = document.getElementsByName('address_2')
      
    //   if(!((inputValueOfPostalCode[0].value === "" && inputValueOfAddress1[0].value === "" && inputValueOfAddress2[0].value === "") || (inputValueOfPostalCode[0].value !== "" && inputValueOfAddress1[0].value !== "" && inputValueOfAddress2[0].value !== ""))) {
    //     window.alert('郵便番号・住所を入力する場合は正しく入力してください。')
    //     return
    //   }
    // }
    
    //formkeyの追加
    formData.append('formkey','updatekey')
    dispatch(updateMemberForPublic(formData))
  }

  // パスワード変更処理
  const handleChangePassword = () => {
    dispatch(changeLoadingAction(true))
    
    const res = window.confirm("パスワードの変更を行いますか？")
    if(!res) {
      dispatch(changeLoadingAction(false))
      return
    }
    
    const formData = new FormData();
    formData.append("formkey", "sendkey")
    formData.append("mail_address", currentMailAddress)
    dispatch(changeMemberPasswordProcess(formData))
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
  }

  // 住所を編集可能にする
  const editAddress = () => {
    setIsAddressEditable(true);
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: '会員情報変更',
      href: '/mypage/member_edit'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="member_edit_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="member_edit_content form_type_1">
          <h1>会員情報変更</h1>
          <p className="introduction">お客様の情報をご入力ください。</p>
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>お名前<span className="required">必須</span></th>
                  <td>
                    <div className="family_name_area">
                      <span>姓</span>
                      <input
                        type = "text"
                        name = {'family_name'}
                        maxLength="20"
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
                        maxLength="20"
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
                        maxLength="20"
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
                        maxLength="20"
                        value = {firstNameFuriganaValue}
                        onChange = {inputFirstNameFuriganaValue}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>生年月日</th>
                  <td>
                    <input
                      type = "text"
                      name = {'birthday'}
                      maxLength="10"
                      value = {birthdayValue}
                      onChange = {inputBirthdayValue}
                      placeholder = {'1984/1/30'}
                    />
                    <span>※西暦から入力してください。</span>
                  </td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>
                    〒
                    {isAddressEditable
                      ? <>
                          <input
                            type = "text"
                            name = {'postal_code'}
                            maxLength="8"
                            value = {postalCodeEditableValue}
                            placeholder="123-4567"
                            onChange = {inputPostalCodeEditableValue}
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
                          />
                          <button onClick={()=>editAddress()}>住所を編集する</button>
                        </>
                    }
                  </td>
                </tr>
                <tr>
                  <th>住所</th>
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
                          />
                          <input
                            type = "text"
                            name = {'address_2'}
                            maxLength="150"
                            value = {address2Value}
                            onChange = {inputAddress2Value}
                            placeholder = {"続きの住所を入力してください"}
                          />

                          {/* DB登録用：address_1とaddress_2を文字列結合 */}
                          <input
                            type = "text"
                            name = {'address'}
                            value = {address1Value + address2Value}
                            onChange = {inputAddressValue}
                            readOnly
                            hidden
                          />
                        </>
                      : <input
                          type = "text"
                          name = {'address'}
                          value = {addressValue}
                          onChange = {inputAddressValue}
                          readOnly
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
                      maxLength="13"
                      placeholder="090-1234-5678"
                      value = {telnumberValue}
                      onChange = {inputTelnumberValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>メールアドレス<span className="required">必須</span></th>
                  <td>
                    <input
                      type = "text"
                      name = {'mail_address'}
                      maxLength="255"
                      placeholder="abcd@abcd.abc"
                      value = {mailAddressValue}
                      onChange = {inputMailAddressValue}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th className="re_mail_address_input"><span>メールアドレス<br/>（確認用）</span><span className="required">必須</span></th>
                  <td>
                    <input
                      type = "text"
                      name = {'re_mail_address'}
                      maxLength="255"
                      placeholder="abcd@abcd.abc"
                      value = {reMailAddressValue}
                      onChange = {inputReMailAddressValue}
                      required
                    />
                    <span>※確認のためもう一度ご入力ください。</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    メルマガ配信希望<span className="required">必須</span>
                  </th>
                  <td>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="mail_magazine_flag"
                        value={1}
                        checked = {mailMagazineFlagValue === '1'}
                        onChange = {inputMailMagazineFlagValue}
                        required
                      />希望する
                    </label>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="mail_magazine_flag"
                        value={0}
                        checked = {mailMagazineFlagValue === '0'}
                        onChange = {inputMailMagazineFlagValue}
                        required
                      />希望しない
                    </label>
                  </td>
                </tr>
                <tr>
                  <th>お届け先リスト</th>
                  <td>
                    <button onClick={()=>dispatch(push(RouteDir+'/mypage/delivery_address_list'))}>お届け先リストを追加・編集する</button>
                  </td>
                </tr>
                <tr>
                  <th>パスワード</th>
                  <td>
                    <button onClick={()=>handleChangePassword()}>パスワードを変更する</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="agree_area">
              <p>
                <input
                  type = "checkbox"
                  name = "agree"
                  value = {true}
                  onChange = {()=>inputValueCheck()}
                  required
                />
                <span className="link_span" onClick={()=>window.open(RouteDir+'/privacy_policy', '_blank')}>プライバシーポリシー</span>
                に同意する。
              </p>
            </div>
          </form>
          <div className="button_area">
          <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>お客様情報を変更する</button>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default Signup