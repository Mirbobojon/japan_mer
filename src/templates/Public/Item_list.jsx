import React, { useEffect, useState } from "react"
import { insertFloor, insertH1 } from '../../reducks/pageInfos/operations'
import { selectPublicItemList } from '../../reducks/items/operations'
import { Paging } from '../../components/UIkit'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { SiteTitle } from './common'
import { ApiDir, ImagesDir, RouteDir, ItemImageDir } from '../../common'
import queryString from 'query-string'
import { calcItemTaxIncludedPrice } from "../../myLib"


const ItemList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)
  const thisUrl = props.location.pathname + props.location.search
  let pageUrl = ''
  if(queryParam.paged)
  {
    pageUrl = thisUrl.replace(RouteDir+'/', '')
    pageUrl = pageUrl.replace('?paged='+queryParam.paged, '')
    pageUrl = pageUrl.replace('&paged='+queryParam.paged, '')
    pageUrl = pageUrl.replace('&', '')
  }
  else
  {
    pageUrl = thisUrl.replace(RouteDir+'/', '')
  }

  const items = useSelector(state => state.items.list)


  // const selectCategory = useSelector(state => state.items.selectCategory)
  // const selectKeyword = useSelector(state => state.items.selectKeyword)

  const dispatch = useDispatch()

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  const getQueryCategory = (queryParam) =>
  {
    if(queryParam.category)
    {
      return queryParam.category
    }
    else
    {
      return ''
    }
  }

  const getQueryKeyword = (queryParam) =>
  {
    if(queryParam.keyword)
    {
      return queryParam.keyword
    }
    else
    {
      return ''
    }
  }

  useEffect(()=>{
    //パンくずリストをセット
    const Floors =
    [
      {
        name: '商品一覧',
        href: '/item/list'
      }
    ]
    dispatch(insertFloor(Floors))

    //h1をセット
    dispatch(insertH1('商品一覧'))

    //商品情報を取得
    dispatch(selectPublicItemList(getQueryCategory(queryParam), getQueryKeyword(queryParam)))

    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(15) //１ページに表示する数
  },[dispatch, queryParam.category, queryParam.keyword, queryParam.paged])

  const meta =
  {
    title: SiteTitle,
  }

  return(
    <DocumentMeta {...meta}>
      <div id="item_list_page" className="flex_1 list_type_1">
        <main className="item_list_content">
          {Array.isArray(items) && items.length!==0?
          <>
            <section className="item_card_list_area">
              {Array.isArray(items) && items.map((item, i) => (
                (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
                <div className={item.stock_quantity==='0'?"item_card nostock":"item_card"} key={i} onClick={()=>dispatch(push(RouteDir+'/item/detail/'+item.id))}>
                  <div className="thumbnail_area" style={item.path!==null?{backgroundImage:`url('${ItemImageDir}${item.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}></div>
                  <p className="item_name">{item.name}</p>
                  <p className="item_price">￥{calcItemTaxIncludedPrice(item.price, item.tax).toLocaleString()}(税込)</p>
                </div>
              ))}
            </section>
            <Paging
              publicPage = {true}
              length = {items.length}
              paged = {paged}
              showCount = {showCount}
              prevtext = {'前へ'}
              nexttext = {'次へ'}
              slug = {pageUrl}
            />
          </>
          :
          <p>表示できる商品がありません。</p>
          }
          <div></div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default ItemList