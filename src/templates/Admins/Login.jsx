import React, { useCallback, useState } from "react"
import { loginAdmin } from '../../reducks/admins/operations'
import { useDispatch } from 'react-redux'
import { Header } from '../../components/admins'
import DocumentMeta from 'react-document-meta'
import { push } from "connected-react-router"
import { SiteTitle } from './common'
import { AdminsDir } from "../../common"
import { isMailAddressValid } from "../../myLib"

const Login = (props) =>
{
  const dispatch = useDispatch()

  //メールアドレス入力
  const [mailaddressValue, setMailaddressValue] = useState('')
  const inputMailaddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailaddressValue(event.target.value)
  }, [setMailaddressValue])

  //パスワード入力
  const [passwordValue, setPasswordValue] = useState('')
  const inputPasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setPasswordValue(event.target.value)
  }, [setPasswordValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfMailaddress = document.getElementsByName('mail_address')
    const inputValueOfPassword = document.getElementsByName('password')

    if(inputValueOfMailaddress[0].value !== '' && inputValueOfPassword[0].value !== '')
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

    //form情報の取得
    const formElement = document.getElementById('send_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','loginkey')
    dispatch(loginAdmin(formData, props))
  }

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="admins_page">
        <Header />
        <div id="login_area" className={'content_area form_type_3'}>
          <div className="subline">
            <h2>ログイン</h2>
            <div className="form_area">
              <p>ログインID（メールアドレス）とパスワードを入力してください。</p>
              <form encType="multipart/form-data" method="post" id="send_form" onSubmit={(e)=>e.preventDefault()}>
                <dl>
                  <dt>メールアドレス</dt>
                  <dd>
                    <input
                      type = "text"
                      name = {'mail_address'}
                      value = {mailaddressValue}
                      onChange = {inputMailaddressValue}
                      autoFocus
                    />
                  </dd>
                </dl>
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
              </form>
              <p className="password_application_btn" onClick={()=>dispatch(push(AdminsDir+'/admin_reissue_application'))}>パスワードを忘れた方はこちら&emsp;→</p>
              <div className="button_area">
                <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>ログイン</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentMeta>
  )
}

export default Login