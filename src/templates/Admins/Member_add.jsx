import React, { useCallback, useState } from "react"
import { insertMember } from '../../reducks/members/operations'
import { useDispatch } from 'react-redux'
import { JsDir, REGEX_BIRTHDAY, REGEX_TEL_NUMBER } from "../../common"
import importScript from '../../components/hooks/ImportScript'
import { isMailAddressValid, isPasswordValid } from "../../myLib"


const ItemList = (props) =>
{
  // svg操作のjsの読み込み
  importScript(JsDir + '/ajaxzip3.js')
  const dispatch = useDispatch()

  //姓の入力
  const [familyNameValue, setFamilyNameValue] = useState('')
  const inputFamilyNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setFamilyNameValue(event.target.value)
  }, [setFamilyNameValue])

  //名の入力
  const [firstNameValue, setFirstNameValue] = useState('')
  const inputFirstNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setFirstNameValue(event.target.value)
  }, [setFirstNameValue])

  //セイの入力
  const [familyNameFuriganaValue, setFamilyNameFuriganaValue] = useState('')
  const inputFamilyNameFuriganaValue = useCallback((event) =>
  {
    inputValueCheck()
    setFamilyNameFuriganaValue(event.target.value)
  }, [setFamilyNameFuriganaValue])

  //メイの入力
  const [firstNameFuriganaValue, setFirstNameFuriganaValue] = useState('')
  const inputFirstNameFuriganaValue = useCallback((event) =>
  {
    inputValueCheck()
    setFirstNameFuriganaValue(event.target.value)
  }, [setFirstNameFuriganaValue])

  //パスワードの入力
  const [passwordValue, setPasswordValue] = useState('')
  const inputPasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setPasswordValue(event.target.value)
  }, [setPasswordValue])

  //パスワード（確認用）の入力
  const [rePasswordValue, setRePasswordValue] = useState('')
  const inputRePasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setRePasswordValue(event.target.value)
  }, [setRePasswordValue])

  //生年月日の入力
  const [birthdayValue, setBirthdayValue] = useState('')
  const inputBirthdayValue = useCallback((event) =>
  {
    inputValueCheck()
    setBirthdayValue(event.target.value)
  }, [setBirthdayValue])

  //郵便番号の入力
  const [postalCodeValue, setPostalCodeValue] = useState('')
  const inputPostalCodeValue = useCallback((event) =>
  {
    setAddress1Value("")
    setTimeout(() => {
      inputValueCheck()
    }, 100);
    setPostalCodeValue(event.target.value)
  }, [setPostalCodeValue])

  //住所の入力
  // const [addressValue, setAddressValue] = useState('')
  // const inputAddressValue = useCallback((event) =>
  // {
  //   inputValueCheck()
  //   setAddressValue(event.target.value)
  // }, [setAddressValue])

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

  //電話番号の入力
  const [telnumberValue, setTelnumberValue] = useState('')
  const inputTelnumberValue = useCallback((event) =>
  {
    inputValueCheck()
    setTelnumberValue(event.target.value)
  }, [setTelnumberValue])

  //メールアドレスの入力
  const [mailAddressValue, setMailAddressValue] = useState('')
  const inputMailAddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailAddressValue(event.target.value)
  }, [setMailAddressValue])

  //メルマガの受信の入力
  const [mailMagazineFlagValue, setMailMagazineFlagValue] = useState('1')
  const inputMailMagazineFlagValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailMagazineFlagValue(event.target.value)
  }, [setMailMagazineFlagValue])

  //入力値が入っているかの確認
  const inputValueCheck = () => {
    console.log("inputvaluecheck")
    const formElem = document.getElementById('add_form');
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

  // フォーム入力チェック
  // const validateForm = (formElem) => {
  //   for(let i=0; i < formElem.elements.length; i++) {
  //     const elem = formElem.elements[i];
  //     if(elem.tagName === "INPUT") {  /* inputタグのみチェック */
  //       // if(formElem.elements[i].hasAttribute("required")) {
  //         if(formElem.elements[i].value.trim() == "") {
  //           window.alert("すべての項目に入力してください。")
  //           return false;
  //         }
  //       // }
  //     }
  //   }
  //   return true;
  // }

  //登録ボタン押下時の処理
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
      return;
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
    
    //form情報の取得
    const formElement = document.getElementById('add_form')
    // if(validateForm(formElement)) {
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','insertkey')
    dispatch(insertMember(formData))
    // }
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

  return(
    <main id="admin_add_page">
      <h2 className="page_title"><span>会員新規登録</span></h2>
      <section className="box_type_1">
        <div className="title_area">
          <h3>会員情報</h3>
        </div>
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="add_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>氏名</th>
                  <td className="flex">
                    <span className="header">姓</span>
                    <input
                      type = "text"
                      name = {'family_name'}
                      maxLength="20"
                      className = ""
                      value = {familyNameValue}
                      onChange = {inputFamilyNameValue}
                      required
                    />
                    <br/>
                    <span className="header">名</span>
                    <input
                      type = "text"
                      name = {'first_name'}
                      maxLength="20"
                      value = {firstNameValue}
                      onChange = {inputFirstNameValue}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>フリガナ</th>
                  <td className="flex">
                  <span className="header">セイ</span>
                    <input
                      type = "text"
                      name = {'family_name_furigana'}
                      maxLength="20"
                      value = {familyNameFuriganaValue}
                      onChange = {inputFamilyNameFuriganaValue}
                      required
                    />
                    <br/>
                    <span className="header">メイ</span>
                    <input
                      type = "text"
                      name = {'first_name_furigana'}
                      maxLength="20"
                      value = {firstNameFuriganaValue}
                      onChange = {inputFirstNameFuriganaValue}
                      required
                    />
                  </td>
                </tr>
                
                <tr>
                  <th>生年月日</th>
                  <td className="birthday_box">
                    <input
                      type = "text"
                      name = "birthday"
                      maxLength="10"
                      value = {birthdayValue}
                      placeholder="1980-01-01"
                      onChange = {inputBirthdayValue}
                    />
                    <span>※西暦で入力してください</span>
                  </td>
                </tr>
                <tr>
                  <th>郵便番号</th>
                  <td>
                    <input
                      type = "text"
                      name = "postal_code"
                      maxLength="8"
                      value = {postalCodeValue}
                      placeholder="123-4567"
                      onChange = {inputPostalCodeValue}
                    />
                    <button onClick={()=>postalAutoInput()}>郵便番号から検索</button>
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
                    />
                    <input
                      type = "text"
                      name = {'address_2'}
                      maxLength="150"
                      value = {address2Value}
                      onChange = {inputAddress2Value}
                      placeholder = {"続きの住所を入力してください"}
                    />
                    <input
                      type = "text"
                      name = "address"
                      value = {address1Value + address2Value}
                      readOnly
                      hidden
                    />
                  </td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>
                    <input
                      type = "text"
                      name = "telnumber"
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
                    <input
                      type = "text"
                      name = "mail_address"
                      maxLength="255"
                      placeholder="abcd@abcd.abc"
                      value = {mailAddressValue}
                      onChange = {inputMailAddressValue}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>パスワード</th>
                  <td>
                    <input
                      type = "text"
                      name = {'password'}
                      value = {passwordValue}
                      onChange = {inputPasswordValue}
                      required
                    />
                    <br/>
                    <input
                      type = "text"
                      name = {'re_password'}
                      value = {rePasswordValue}
                      onChange = {inputRePasswordValue}
                      placeholder = {'確認のためにもう一度入力してください'}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>メルマガ配信希望</th>
                  <td className="mail_magazine_flag_box">
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
                  <br/>
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
              </tbody>
            </table>
          </form>
        </div>
        <div className="button_area">
          <button id = "insert_btn" className="desabled" onClick={()=>sendFormData()}>登録</button>
        </div>
      </section>
    </main>
  )
}

export default ItemList