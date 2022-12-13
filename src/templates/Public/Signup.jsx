import React, { useCallback, useState } from "react"
import { insertMemberForPublic } from '../../reducks/members/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import DocumentMeta from 'react-document-meta'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir, JsDir, REGEX_TEL_NUMBER, REGEX_BIRTHDAY } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import importScript from '../../components/hooks/ImportScript'
import { isPasswordValid } from "../../myLib"
import { useEffect } from "react"

const Signup = (props) =>
{
  // 郵便番号情報の読み込み
  importScript(JsDir + '/ajaxzip3.js')

  //ストア情報からメールアドレスを取得
  const mailAddress = useSelector(state => state.members.applicationMailAddress)

  const serial = props.match.params.serial

  const dispatch = useDispatch()

  //ローディング
  const loading = useSelector(state => state.pageInfos.loading)

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

  //パスワード入力
  const [passwordValue, setPasswordValue] = useState('')
  const inputPasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setPasswordValue(event.target.value)
  }, [setPasswordValue])

  //再パスワード入力
  const [rePasswordValue, setRePasswordValue] = useState('')
  const inputRePasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setRePasswordValue(event.target.value)
  }, [setRePasswordValue])

  //生年月日入力
  const [birthdayValue, setBirthdayValue] = useState('')
  const inputBirthdayValue = useCallback((event) =>
  {
    inputValueCheck()
    setBirthdayValue(event.target.value)
  }, [setBirthdayValue])

  //郵便番号入力
  const [postalCodeValue, setPostalcodeValue] = useState('')
  const inputPostalCodeValue = useCallback((event) =>
  {
    inputValueCheck()
    setPostalcodeValue(event.target.value)
    setAddress1Value("")
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

  //メルマガ配信希望入力
  const [mailMagazineFlagValue, setMailMagazineFlagValue] = useState('1')
  const inputMailMagazineFlagValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailMagazineFlagValue(event.target.value)
  }, [setMailMagazineFlagValue])


  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfFamilyName = document.getElementsByName('family_name')
    const inputValueOfFirstName = document.getElementsByName('first_name')
    const inputValueOfFamilyNameFurigana = document.getElementsByName('family_name_furigana')
    const inputValueOfdFirstNameFurigana = document.getElementsByName('first_name_furigana')
    const inputValueOfPassword = document.getElementsByName('password')
    const inputValueOfRePassword = document.getElementsByName('re_password')
    const inputValueOfMailMagazineFlag = document.getElementsByName('mail_magazine_flag')
    const inputValueOfAgree = document.getElementsByName('agree')

    if(inputValueOfFamilyName[0].value !== '' && inputValueOfFirstName[0].value !== '' && inputValueOfFamilyNameFurigana[0].value !== '' && inputValueOfdFirstNameFurigana[0].value !== '' && inputValueOfPassword[0].value !== '' && inputValueOfRePassword[0].value !== '' && inputValueOfMailMagazineFlag[0].value !== '' && inputValueOfAgree[0].checked === true)
    {
      document.getElementById('send_btn').classList.remove('desabled')
    }
    else
    {
      document.getElementById('send_btn').classList.add('desabled')
    }
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
    
    // パスワード要件を満たしているか検証
    if(!isPasswordValid(passwordValue)) {
      window.alert("パスワードは10~20文字の半角英数字・記号で入力してください。")
      return;
    }
    
    // パスワードと確認用パスワードが一致するか検証
    if(passwordValue !== rePasswordValue) {
      window.alert("パスワードと確認用パスワードが一致しません。")
      return;
    }

    // 住所入力チェック（郵便番号,住所1,住所2：全項目入力 or 全項目未入力）
    if(!((postalCodeValue === "" && address1Value === "" && address2Value === "") || (postalCodeValue !== "" && address1Value !== "" && address2Value !== ""))) {
      window.alert('郵便番号・住所を入力する場合は正しく入力してください。')
      return
    }
    
    //form情報の取得
    const formElement = document.getElementById('send_form')
    const formData = new FormData(formElement);

    //ローディング開始
    dispatch(changeLoading(true))

    //formkeyの追加
    formData.append('serial',serial)
    formData.append('formkey','insertkey')
    dispatch(insertMemberForPublic(formData))
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
    },100)
  }

  const deleteAddress = () => {
    setPostalcodeValue("")
    setAddress1Value("")
    setAddress2Value("")
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: '新規会員登録',
      href: '/signup'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="signup_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="signup_content form_type_1">
          <h1>新規会員登録</h1>
          <p className="introduction">お客様の情報をご入力ください。</p>
          <form encType="multipart/form-data" method="post" id="send_form" onSubmit={(e)=>e.preventDefault()}>
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
                      placeholder="1980-01-01"
                    />
                    <span>※西暦から入力してください。</span>
                  </td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>
                    〒
                    <input
                      type = "text"
                      name = {'postal_code'}
                      maxLength="8"
                      value = {postalCodeValue}
                      placeholder="123-4567"
                      onChange = {inputPostalCodeValue}
                    />
                    <button onClick={()=>postalAutoInput()}>郵便番号から検索</button>
                    <button onClick={()=>deleteAddress()}>住所の入力内容を削除</button>
                  </td>
                </tr>
                <tr>
                  <th>住所</th>
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
                      maxLength="150"
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
                      maxLength="13"
                      placeholder="090-1234-5678"
                      value = {telnumberValue}
                      onChange = {inputTelnumberValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>
                    {mailAddress}
                    <input type="hidden" name="mail_address" value={mailAddress} />
                  </td>
                </tr>
                <tr>
                  <th>パスワード<span className="required">必須</span></th>
                  <td>
                    <input
                      type = "text"
                      name = {'password'}
                      value = {passwordValue}
                      onChange = {inputPasswordValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="re_password_input"><span>パスワード<br/>（確認用）</span><span className="required">必須</span></th>
                  <td>
                    <input
                      type = "text"
                      name = {'re_password'}
                      value = {rePasswordValue}
                      onChange = {inputRePasswordValue}
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
                      />希望する
                    </label>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="mail_magazine_flag"
                        value={0}
                        checked = {mailMagazineFlagValue === '0'}
                        onChange = {inputMailMagazineFlagValue}
                      />希望しない
                    </label>
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
                />
                <span className="link_span" onClick={()=>window.open(RouteDir+'/privacy_policy', '_blank')}>プライバシーポリシー</span>
                に同意する。
              </p>
            </div>
          </form>
          <div className="button_area">
          <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>新規会員登録する</button>
          </div>
        </main>
      </div>
      <div id="loading_area" className={loading===true?'':'hidden'}>
        <div className="loader">Loading...</div>
      </div>
    </DocumentMeta>
  )
}

export default Signup