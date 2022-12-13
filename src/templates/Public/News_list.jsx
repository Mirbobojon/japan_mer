import React, { useEffect, useState } from "react"
import { insertFloor, insertH1 } from '../../reducks/pageInfos/operations'
import { Paging } from '../../components/UIkit'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { SiteTitle } from './common'
import { ApiDir, ImagesDir, NewsImageDir, RouteDir } from '../../common'
import queryString from 'query-string'


const ItemList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()

  const [news, setNews] = useState([])

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  useEffect(()=>{
    //パンくずリストをセット
    const Floors =
    [
      {
        name: 'お知らせ一覧',
        href: '/news/list'
      }
    ]
    dispatch(insertFloor(Floors))

    //h1をセット
    dispatch(insertH1('ショップからのお知らせ'))

    let params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectPublicNewsList.php',params)
    .then(function(response){
      setNews(response.data)
    })
    .catch(function(error){
      console.log(error)
      return
    })
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(10) //１ページに表示する数
  },[dispatch, queryParam.paged])

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="news_list_page" className="flex_1">
        <main className="news_list_content">
          <section className="news_card_list_area">
            {Array.isArray(news) && news.map((item, i) => {
              let newFlag = false
              let newsDate = ''
              let newsBody = ''

              //公開日の整形
              const date = new Date(item.publication_datetime)
              newsDate = (date.getFullYear()+ '.' + (date.getMonth() + 1) + '.' + date.getDate())

              //公開7日以内の記事かどうか
              let targetday = new Date()
              targetday.setDate(targetday.getDate()-7)
              if(targetday < date)
              {
                newFlag = true
              }

              //お知らせ内容の整形
              const bodyHtml = new DOMParser().parseFromString(item.body, 'text/html')
              const maxLength = 80 //文字数上限
              let modStr = ''
              let bodyString = bodyHtml.documentElement.textContent
              if(bodyString.length > maxLength){
                modStr = bodyString.substr(0, maxLength) + '...'
              }
              newsBody = modStr
              return(
              (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
              <div className="news_card" key={i}>
                <div className="left_content">
                  <p className="date">{newsDate}{newFlag&&<span className="new_tag">NEW</span>}</p>
                  <p className="title">{item.title}</p>
                  <p className="news_body_html" dangerouslySetInnerHTML={{__html: newsBody}}></p>
                  <button className="news_detail_link_btn" onClick={()=>dispatch(push(RouteDir+'/news/detail/'+item.id))}>詳しく見る　→</button>
                </div>
                <div className="right_content" style={item.path!==null?{backgroundImage:`url('${NewsImageDir}${item.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}></div>
              </div>
              )
            })}
          </section>
          <Paging
            publicPage = {true}
            length = {news.length}
            paged = {paged}
            showCount = {showCount}
            prevtext = {'前へ'}
            nexttext = {'次へ'}
            slug = {'news/list'}
          />
        </main>
      </div>
    </DocumentMeta>
  )
}

export default ItemList