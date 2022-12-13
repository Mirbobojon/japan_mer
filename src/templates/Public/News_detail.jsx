import React, { useEffect, useState } from "react"
import { insertFloor, insertH1 } from '../../reducks/pageInfos/operations'
import { Paging } from '../../components/UIkit'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { SiteTitle } from './common'
import { ApiDir, ImagesDir, RouteDir } from '../../common'


const ItemList = (props) =>
{
  //お知らせIDをURLパラメータから取得
  const pageItemId = props.match.params.id

  const dispatch = useDispatch()

  const [newsInfo, setNewsInfo] = useState('')    //お知らせ情報
  const [newsDate, setNewsDate] = useState('')    //お知らせ公開日情報
  const [newFlag, setNewFlag] = useState(false)    //お知らせ新着フラグ情報
  const [newsBody, setNewsBody] = useState('')    //お知らせ内容情報

  useEffect(()=>{
    //パンくずリストをセット
    const Floors =
    [
      {
        name: newsInfo.title,
        href: '/news/edit'+newsInfo.id
      }
    ]
    dispatch(insertFloor(Floors))

    //h1をセット
    dispatch(insertH1('ショップからのお知らせ'))

    //商品情報を取得
    let params = new URLSearchParams();
    params.append('news_id',pageItemId);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectPublicNews.php',params)
    .then(function(response){
      setNewsInfo(response.data[0])

      //公開日の整形
      const date = new Date(response.data[0].publication_datetime)
      if(!isNaN(date.getFullYear()))
      {
        setNewsDate(date.getFullYear()+ '.' + (date.getMonth() + 1) + '.' + date.getDate())
      }

      //公開7日以内の記事かどうか
      let targetday = new Date()
      targetday.setDate(targetday.getDate()-7)
      if(targetday > date)
      {
        setNewFlag(true)
      }

      //お知らせ内容の整形
      const bodyHtml = new DOMParser().parseFromString(response.data[0].body, 'text/html')
      let bodyString = bodyHtml.documentElement.textContent
      setNewsBody(bodyString)

    })
    .catch(function(error){
      console.log(error)
      return
    })

  },[dispatch, newsInfo.id, newsInfo.title, pageItemId])

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="news_detail_page" className="flex_1">
        <main className="news_detail_content">
          <p className="date">{newsDate}{newFlag&&<span className="new_tag">NEW</span>}</p>
          <h2 className="title">{newsInfo.title}</h2>
          <div className="body_area content_html" dangerouslySetInnerHTML={{__html: newsBody}}></div>
          <button className="news_list_link_btn"  onClick={()=>dispatch(push(RouteDir+'/news/list'))}>お知らせ一覧へ戻る</button>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default ItemList