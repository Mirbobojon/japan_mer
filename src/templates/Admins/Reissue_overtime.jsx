import React from "react"
import { useDispatch } from 'react-redux'
import { Header } from '../../components/admins'
import DocumentMeta from 'react-document-meta'
import { push } from "connected-react-router"
import { SiteTitle } from './common'
import { AdminsDir } from "../../common"

const Login = (props) =>
{
  const dispatch = useDispatch()

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="admins_page">
        <Header />
        <div id="reissue_overtime_area" className={'content_area form_type_3'}>
          <div className="subline">
            <h2>エラーページ</h2>
            <div className="form_area">
              <p>有効期限が過ぎています。<br/>パスワード再発行申請を再度行ってください。</p>
              <div className="button_area">
                <button id = "send_btn" onClick={()=>dispatch(push(AdminsDir+'/login'))}>ログインページ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentMeta>
  )
}

export default Login