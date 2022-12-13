import React, { useCallback, useState } from "react"
import { sendContactMail } from '../../reducks/mails/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import DocumentMeta from 'react-document-meta'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import { isMailAddressValid } from "../../myLib"

const Contact = () =>
{
  const dispatch = useDispatch()

  //ローディング
  const loading = useSelector(state => state.pageInfos.loading)

  //お問い合わせ種類入力
  const [contactTypeValue, setContactTypeValue] = useState('商品について')
  const inputContactTypeValue = useCallback((event) =>
  {
    inputValueCheck()
    setContactTypeValue(event.target.value)
  }, [setContactTypeValue])

  //姓入力
  const [familyNameValue, setFamilyNameValue] = useState([])
  const inputFamilyNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setFamilyNameValue(event.target.value)
  }, [setFamilyNameValue])

  //名入力
  const [firstNameValue, setFirstNameValue] = useState([])
  const inputFirstNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setFirstNameValue(event.target.value)
  }, [setFirstNameValue])

  //セイ入力
  const [familyNameFuriganaValue, setFamilyNameFuriganaValue] = useState([])
  const inputFamilyNameFuriganaValue = useCallback((event) =>
  {
    inputValueCheck()
    setFamilyNameFuriganaValue(event.target.value)
  }, [setFamilyNameFuriganaValue])

  //メイ入力
  const [firstNameFuriganaValue, setFirstNameFuriganaValue] = useState([])
  const inputFirstNameFuriganaValue = useCallback((event) =>
  {
    inputValueCheck()
    setFirstNameFuriganaValue(event.target.value)
  }, [setFirstNameFuriganaValue])

  //メールアドレス入力
  const [mailaddressValue, setMailaddressValue] = useState([])
  const inputMailaddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailaddressValue(event.target.value)
  }, [setMailaddressValue])

  //メールアドレス(再入力)入力
  const [reMailaddressValue, setReMailaddressValue] = useState([])
  const inputReMailaddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setReMailaddressValue(event.target.value)
  }, [setReMailaddressValue])

  //お問い合わせ内容入力
  const [bodyValue, setBodyValue] = useState([])
  const inputBodyValue = useCallback((event) =>
  {
    inputValueCheck()
    setBodyValue(event.target.value)
  }, [setBodyValue])


  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfFamilyName = document.getElementsByName('family_name')
    const inputValueOfFirstName = document.getElementsByName('first_name')
    const inputValueOfFamilyNameFurigana = document.getElementsByName('family_name_furigana')
    const inputValueOfdFirstNameFurigana = document.getElementsByName('first_name_furigana')
    const inputValueOfMailaddress = document.getElementsByName('mail_address')
    const inputValueOfReMailaddress = document.getElementsByName('re_mail_address')
    const inputValueOfBody = document.getElementsByName('body')
    const inputValueOfAgree = document.getElementsByName('agree')

    if(inputValueOfFamilyName[0].value !== '' && inputValueOfFirstName[0].value !== '' && inputValueOfFamilyNameFurigana[0].value !== '' && inputValueOfdFirstNameFurigana[0].value !== '' && inputValueOfMailaddress[0].value !== '' && inputValueOfReMailaddress[0].value !== '' && inputValueOfBody[0].value !== '' && inputValueOfAgree[0].checked === true)
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
    // メールアドレス要件を満たしているか検証
    if(!isMailAddressValid(mailaddressValue)) {
      window.alert("メールアドレスを正しく入力してください。")
      return
    }
    
    if(mailaddressValue !== reMailaddressValue) {
      window.alert('メールアドレスが一致していません。')
      return
    }

    //ローディング開始
    dispatch(changeLoading(true))

    //form情報の取得
    const formElement = document.getElementById('send_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','sendkey')
    dispatch(sendContactMail(formData))
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'お問い合わせ',
      href: '/contact'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="contact_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="contact_content">
          <h1>お問い合わせ</h1>
          <p className="introduction">商品に関することや、当店に対するご意見・ご感想、お問い合わせなどございましたら、こちらのお問い合わせフォームよりお気軽にお尋ねください。</p>
          <form encType="multipart/form-data" method="post" id="send_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>
                    お問い合わせ種類<span className="required">必須</span>
                  </th>
                  <td>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="contact_type"
                        value={'商品について'}
                        checked = {contactTypeValue === '商品について'}
                        onChange = {inputContactTypeValue}
                      />商品について
                    </label>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="contact_type"
                        value={'ご意見・ご感想'}
                        checked = {contactTypeValue === 'ご意見・ご感想'}
                        onChange = {inputContactTypeValue}
                      />ご意見・ご感想
                    </label>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="contact_type"
                        value={'その他お問い合わせ'}
                        checked = {contactTypeValue === 'その他お問い合わせ'}
                        onChange = {inputContactTypeValue}
                      />その他お問い合わせ
                    </label>
                  </td>
                </tr>
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
                  <th>メールアドレス<span className="required">必須</span></th>
                  <td>
                    <input
                      type = "text"
                      name = {'mail_address'}
                      maxLength="255"
                      value = {mailaddressValue}
                      onChange = {inputMailaddressValue}
                    />
                    <span>※半角英数字で入力してください。</span>
                    <p>※携帯のメールアドレスをご入力される場合、受信許可を設定してください。</p>
                  </td>
                </tr>
                <tr>
                  <th className="re_mail_address_input"><span>メールアドレス<br/>（確認用）</span><span className="required">必須</span></th>
                  <td>
                    <input
                      type = "text"
                      name = {'re_mail_address'}
                      maxLength="255"
                      value = {reMailaddressValue}
                      onChange = {inputReMailaddressValue}
                    />
                    <span>※半角英数字で入力してください。</span>
                    <p>※携帯のメールアドレスをご入力される場合、受信許可を設定してください。</p>
                  </td>
                </tr>
                <tr>
                  <th>お問い合わせ内容<span className="required">必須</span></th>
                  <td>
                    <textarea
                      name = "body"
                      rows = "16"
                      value = {bodyValue}
                      onChange = {inputBodyValue}
                    >
                    </textarea>
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
          <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>送信する</button>
          </div>
        </main>
      </div>
      <div id="loading_area" className={loading===true?'':'hidden'}>
        <div className="loader">Loading...</div>
      </div>
    </DocumentMeta>
  )
}

export default Contact