import React, { useCallback, useState } from "react"
import { loginMember } from '../../reducks/members/operations'
import { useDispatch, useSelector } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import { RouteDir } from "../../common"
import { isMailAddressValid } from "../../myLib"

const Login = (props) =>
{
  const dispatch = useDispatch()
  const moveToTopAfterLogin = useSelector(state => state.pageInfo2.moveToTopAfterLogin)

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
    dispatch(loginMember(formData, props, moveToTopAfterLogin))
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'ログイン',
      href: '/login'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="login_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="login_content">
          <div className="subline_500">
            <h1>ログインする</h1>
            <section className="form_type_2">
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
              <p className="reissue_application_link_btn" onClick={()=>dispatch(push(RouteDir+'/reissue_application'))}>パスワードを忘れた方はこちら　→</p>
              <div className="button_area">
                <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>ログイン</button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default Login