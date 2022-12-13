import React from "react"
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { RouteDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'

const ReissueApplicationDone = () =>
{
  const dispatch = useDispatch()

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'パスワード再発行',
      href: '/reissue_application'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="signup_application_done_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="signup_application_done_content">
          <h1>メール送信完了</h1>
          <div className="text_area">
            <p>
              パスワード再発行用メールを送信しました。<br/>
              メールに記載されているURLより、パスワード再発行を行ってください。
            </p>
            <p>
              しばらくしてもメールが届かない場合は、メールアドレスを再度ご確認の上、再申請してください。<br/>
              それでも届かない場合は、<span className="link_btn" onClick={()=>{dispatch(push(RouteDir+"/contact"))}}>お問い合わせフォーム</span>か<span className="telnumber">お電話</span>にてお問い合わせください。
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

export default ReissueApplicationDone