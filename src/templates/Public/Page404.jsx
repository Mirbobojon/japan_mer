import React from "react"
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import DocumentMeta from 'react-document-meta'
import { RouteDir } from "../../common"
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'

const Page404 = () =>
{
  const dispatch = useDispatch()

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'ページが見つかりません',
      href: '/404'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="signup_application_done_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="signup_application_done_content">
          <h1>ページが見つかりません</h1>
          <div className="text_area">
            <p>
              お探しのページは見つかりませんでした。
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

export default Page404