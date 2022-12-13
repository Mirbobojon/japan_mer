import React, { useCallback, useState } from "react"
import { updateMemberPassword } from '../../reducks/members/operations'
import { useDispatch, useSelector } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import { isPasswordValid } from "../../myLib"

const Reissue = (props) =>
{
  const dispatch = useDispatch()

  //シリアルナンバーをURLパラメータから取得
  const pageSerial = props.match.params.serial

  const ReissueMemberStatus = useSelector(state => state.members.reissueMailAddress)

  //パスワード入力
  const [passwordValue, setPasswordValue] = useState('')
  const inputPasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setPasswordValue(event.target.value)
  }, [setPasswordValue])

  //パスワード（確認用）入力
  const [passwordReValue, setPasswordReValue] = useState('')
  const inputPasswordReValue = useCallback((event) =>
  {
    inputValueCheck()
    setPasswordReValue(event.target.value)
  }, [setPasswordReValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    // const inputValueOfMailaddress = document.getElementsByName('password')

    // if(inputValueOfMailaddress[0].value !== '')
    // {
    //   document.getElementById('send_btn').classList.remove('desabled')
    // }
    // else
    // {
    //   document.getElementById('send_btn').classList.add('desabled')
    // }

    const formElem = document.getElementById('send_form');
    for(let i=0; i < formElem.elements.length; i++) {
      const elem = formElem.elements[i];
      if(elem.tagName === "INPUT") {  /* inputタグのみチェック */
        if(elem.hasAttribute("required")) {
          if(elem.value.trim() === "") {
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
    // パスワード要件を満たしているか検証
    if(!isPasswordValid(passwordValue)) {
      window.alert("パスワードは10~20文字の半角英数字・記号で入力してください。")
      return;
    }

    // パスワードと確認用パスワードが一致するか検証
    if(passwordValue !== passwordReValue) {
      window.alert("パスワードと確認用パスワードが一致しません。")
      return;
    }

    //form情報の取得
    const formElement = document.getElementById('send_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('mail_address',ReissueMemberStatus)
    formData.append('serial',pageSerial)
    formData.append('formkey','updatekey')
    dispatch(updateMemberPassword(formData))
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'パスワード再設定',
      href: '/reissue'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="signup_application_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="signup_application_content">
          <div className="subline_500">
            <h1>パスワード再設定</h1>
            <section className="form_type_2">
              <p>再設定するパスワードを入力してください。</p>
              <p>文字数：10～20文字</p>
              <p>
                使用可能文字：半角英数字・以下の記号<br/><br/>
                {"! \" # $ % & ' ( ) \* \+ \- \. , \/ : ; < = > ? @ \[ \\ \] ^ _ ` { | } ~"}
              </p>
              <form encType="multipart/form-data" method="post" id="send_form" onSubmit={(e)=>e.preventDefault()}>
                <dl>
                  <dt>パスワード</dt>
                  <dd>
                    <input
                      type = "password"
                      name = {'password'}
                      value = {passwordValue}
                      // maxLength = {20}
                      onChange = {inputPasswordValue}
                      placeholder="パスワードを入力してください"
                      required
                      autoFocus
                    />
                  </dd>
                </dl>
                <dl>
                  <dt>パスワード（確認用）</dt>
                  <dd>
                    <input
                      type = "password"
                      name = {'password_re'}
                      value = {passwordReValue}
                      // maxLength = {20}
                      onChange = {inputPasswordReValue}
                      placeholder="もう一度パスワードを入力してください"
                      required
                    />
                  </dd>
                </dl>
              </form>
              <div className="button_area">
                <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>再設定する</button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default Reissue