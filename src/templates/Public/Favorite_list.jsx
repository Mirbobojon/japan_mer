import React, { useEffect, useState } from "react"
import { insertFloor, insertH1 } from '../../reducks/pageInfos/operations'
import { Paging } from '../../components/UIkit'
import DocumentMeta from 'react-document-meta'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { SiteTitle } from './common'
import { ApiDir, ImagesDir, RouteDir, ItemImageDir } from '../../common'
import queryString from 'query-string'
import { deleteFavorite } from "../../reducks/favorites/operations"
import { calcItemTaxIncludedPrice } from "../../myLib"


const ItemList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const selectCategory = useSelector(state => state.items.selectCategory)
  const selectKeyword = useSelector(state => state.items.selectKeyword)

  const dispatch = useDispatch()

  const favoriteList = useSelector(state => state.favorites.list)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  useEffect(()=>{
    //パンくずリストをセット
    const Floors =
    [
      {
        name: 'お気に入り一覧',
        href: '/mypage/favorite_list'
      }
    ]
    dispatch(insertFloor(Floors))

    //h1をセット
    dispatch(insertH1('お気に入り一覧'))

    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(15) //１ページに表示する数
  },[dispatch, queryParam.paged, selectCategory, selectKeyword])

  const meta =
  {
    title: SiteTitle,
  }
  const insertCartStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_cart_w.svg')`
  }

  const deleteFavoriteBtn = (event, itemID)=>
  {
    const result = window.confirm('お気に入り一覧から削除しますか？')
    if(result)
    {
      dispatch(deleteFavorite(itemID))
      event.stopPropagation()
    }
  }

  return(
    <DocumentMeta {...meta}>
      <div id="item_list_page" className="flex_1 list_type_1">
        <main className="item_list_content">
          {Array.isArray(favoriteList) && favoriteList.length!==0?
            <>
            <section className="item_card_list_area">
              {Array.isArray(favoriteList) && favoriteList.map((item, i) => (
                (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
                <div className={item.stock_quantity==='0'?"item_card nostock":"item_card"} key={i} onClick={()=>dispatch(push(RouteDir+'/item/detail/'+item.item_id))}>
                  <div className="thumbnail_area" style={item.path!==null?{backgroundImage:`url('${ItemImageDir}${item.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}>
                    <img onClick={(event)=>{deleteFavoriteBtn(event, item.item_id);event.stopPropagation()}} src={process.env.PUBLIC_URL + '/images/favorite_btn.png'} alt="お気に入り削除ボタン" />
                  </div>
                  <p className="item_name">{item.name}</p>
                  <p className="item_price">￥{calcItemTaxIncludedPrice(item.price, item.tax_value).toLocaleString()}(税込)</p>
                  {/* <div className="btn_area">
                    {item.stock_quantity==='0'?
                      <button className="soldout_btn">売り切れ中</button>:
                      <button className="insert_cart_btn" style={insertCartStyle}>買い物カゴに入れる</button>
                    }
                  </div> */}
                </div>
              ))}
            </section>
            <Paging
              publicPage = {true}
              length = {favoriteList.length}
              paged = {paged}
              showCount = {showCount}
              prevtext = {'前へ'}
              nexttext = {'次へ'}
              slug = {'mypage/favorite_list'}
            />
            </>
          :
          <p>お気に入りに追加された商品はありません。</p>
          }
        </main>
      </div>
    </DocumentMeta>
  )
}

export default ItemList