import React, { useCallback, useState } from "react"
import { updateAdminPassword } from '../../reducks/admins/operations'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../components/admins'
import DocumentMeta from 'react-document-meta'
import { SiteTitle } from './common'
import { isPasswordValid } from "../../myLib"

const Login = (props) =>
{
  const dispatch = useDispatch()

  //シリアルナンバーをURLパラメータから取得
  const pageSerial = props.match.params.serial

  const ReissueAdminStatus = useSelector(state => state.admins.reissueMailAddress)

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
    const inputValueOfPassword = document.getElementsByName('password')

    if(inputValueOfPassword[0].value !== '')
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
    formData.append('mail_address',ReissueAdminStatus)
    formData.append('serial',pageSerial)
    formData.append('formkey','updatekey')
    dispatch(updateAdminPassword(formData))
  }

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="admins_page">
        <Header />
        <div id="reissue_area" className={'content_area form_type_3'}>
          <div className="subline">
            <h2>パスワード再設定</h2>
            <div className="form_area">
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
                      // maxLength="20"
                      onChange = {inputPasswordValue}
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
                      // maxLength="20"
                      onChange = {inputPasswordReValue}
                    />
                  </dd>
                </dl>
              </form>
              <div className="button_area">
                <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>再設定する</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentMeta>
  )
}

export default Login