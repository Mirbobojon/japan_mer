import React from "react"
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { RouteDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'

const SignupDone = () =>
{
  const dispatch = useDispatch()

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: '新規会員登録',
      href: '/signup_application'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="signup_done_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="signup_done_content">
          <h1>会員登録完了</h1>
          <div className="text_area">
            <p>
              会員登録完了しました。<br/>
              確認のためのメールを送信しましたのでご確認ください。
            </p>
            <p>
              しばらくしても、会員登録用メールが届かない場合は<span className="link_btn">お問い合わせフォーム</span>か<span className="telnumber">お電話</span>にてお問い合わせください。
            </p>
            {/* 変更必要 */}
            <p>
              引き続き一括変更（社名）のオンラインショップでお買い物をお楽しみください。
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

export default SignupDone