import React, { useCallback, useState } from "react"
import { signupApplication } from '../../reducks/members/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import { useDispatch, useSelector } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import { isMailAddressValid } from "../../myLib"

const SignupApplication = () =>
{
  const dispatch = useDispatch()

  //ローディング
  const loading = useSelector(state => state.pageInfos.loading)

  //メールアドレス入力
  const [mailaddressValue, setMailaddressValue] = useState('')
  const inputMailaddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailaddressValue(event.target.value)
  }, [setMailaddressValue])

  //メールアドレス(再入力)入力
  const [reMailaddressValue, setReMailaddressValue] = useState('')
  const inputReMailaddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setReMailaddressValue(event.target.value)
  }, [setReMailaddressValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfMailaddress = document.getElementsByName('mail_address')
    const inputValueOfReMailaddress = document.getElementsByName('re_mail_address')

    if(inputValueOfMailaddress[0].value !== '' && inputValueOfReMailaddress[0].value !== '')
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
    dispatch(signupApplication(formData))
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
      <div id="signup_application_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="signup_application_content">
          <h1>新規会員登録</h1>
          <section className="form_type_2">
            <p>新規で会員登録される場合は、ご利用になるメールアドレスを入力し、「送信」ボタンを押してください。<br/>送信されてきたメールより会員登録のページにアクセスし会員登録をしてください。</p>
            <form encType="multipart/form-data" method="post" id="send_form" onSubmit={(e)=>e.preventDefault()}>
              <dl>
                <dt>メールアドレス<span className="required">必須</span></dt>
                <dd>
                  <input
                    type = "text"
                    name = {'mail_address'}
                    value = {mailaddressValue}
                    onChange = {inputMailaddressValue}
                  />
                </dd>
              </dl>
              <dl>
                <dt>確認のためもう一度メールアドレスをご入力ください。<span className="required">必須</span></dt>
                <dd>
                  <input
                    type = "text"
                    name = {'re_mail_address'}
                    value = {reMailaddressValue}
                    onChange = {inputReMailaddressValue}
                  />
                </dd>
              </dl>
            </form>
            <div className="button_area">
              <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>送信する</button>
            </div>
          </section>
        </main>
      </div>
      <div id="loading_area" className={loading===true?'':'hidden'}>
        <div className="loader">Loading...</div>
      </div>
    </DocumentMeta>
  )
}

export default SignupApplication