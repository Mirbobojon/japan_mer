import React from "react"
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { RouteDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'

const ContactDone = () =>
{
  const dispatch = useDispatch()

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'お問い合わせ',
      href: '/contact'
    },
    {
      name: '送信完了',
      href: '/contact_done'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="contact_done_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="contact_done_content">
          <h1>送信が完了しました</h1>
          <div className="text_area">
            <p>
              お問い合わせいただきありがとうございます。<br/>
              確認の為のメールを送信しましたので、ご確認下さい。<br/>
              お問い合わせ頂いた内容を確認の上、回答させていただきます。
            </p>
          </div>
          <div className="button_area">
          <button id = "top_page_link_btn" onClick={()=>dispatch(push(RouteDir))}>トップページに戻る</button>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default ContactDone