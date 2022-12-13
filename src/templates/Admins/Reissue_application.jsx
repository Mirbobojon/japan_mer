import React, { useCallback, useState } from "react"
import { insertReissueApplication } from '../../reducks/admins/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../components/admins'
import DocumentMeta from 'react-document-meta'
import { SiteTitle } from './common'
import {isMailAddressValid} from '../../myLib'

const ReissueApplication = (props) =>
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

  //メールアドレス入力(再入力)
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
    dispatch(insertReissueApplication(formData))
  }

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="admins_page">
        <Header />
        <div id="reissue_application_area" className={'content_area form_type_3'}>
          <div className="subline">
            <h2>パスワード再発行申請</h2>
            <div className="form_area">
              <p>登録したメールアドレスをご入力ください。<br/>再発行用URLをお送りします。</p>
              <form encType="multipart/form-data" method="post" id="send_form" onSubmit={(e)=>e.preventDefault()}>
                <dl>
                  <dt>メールアドレス</dt>
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
                  <dt>確認のためもう一度入力してください。</dt>
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
                <button id = "send_btn" className="desabled" onClick={()=>sendFormData()}>送信</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="loading_area" className={loading===true?'':'hidden'}>
        <div className="loader">Loading...</div>
      </div>
    </DocumentMeta>
  )
}

export default ReissueApplication