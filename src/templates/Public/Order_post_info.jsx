import React, { useEffect } from "react"
import DocumentMeta from 'react-document-meta'
import { selectOrderPostAddressList, deleteOrderPostAddress, InsertOrderPostInfo } from '../../reducks/orders/operations'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumb, OrderFlow } from '../../components'
import { SiteTitle } from './common'
import { RouteDir } from '../../common'
import { push } from "connected-react-router"
import OrderInsertItemNumberList from "../../components/OrderInsertItemNumberList"

const CartList = () =>
{
  const dispatch = useDispatch()

  const items = useSelector(state => state.carts.list)
  const orders = useSelector(state => state.orders.list)

  useEffect(()=>{
    dispatch(selectOrderPostAddressList())
  },[dispatch])

  const deleteConfirm = (postAddressId) =>
  {
    const result = window.confirm('お届け先を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteOrderPostAddress(postAddressId))
    }
    else
    {
      return false
    }
  }

  const insertOrderBtn = () =>
  {
    //stateのオーダー情報に商品情報を挿入
    //order_cardの取得
    const orderCards = document.getElementsByClassName('order_card')
    const orderCardsCount = orderCards.length
    for(let i=0; i<orderCardsCount; i++)
    {
      const formElements = orderCards[i].querySelectorAll('form')
      const formElementsCount = formElements.length
      const orderIndex = orderCards[i].dataset.id

      const insertItemArray = () =>
      {
        let itemArray = []
        for(let k=0;k<formElementsCount;k++)
        {
          const cartIndex = formElements[k].dataset.id
          const itemNumber = formElements[k].querySelector(`input[name='number']`).value
          if(itemNumber.match(/^[0-9]*$/) && itemNumber !== '0' && itemNumber !== '')
          {
            //stateのcartListから商品情報をセット
            itemArray.push(
            {
              item_id: items[cartIndex].item_id,
              name: items[cartIndex].name,
              standard: items[cartIndex].standard,
              postage: items[cartIndex].postage,
              price: items[cartIndex].price,
              tax_value: items[cartIndex].tax_value,
              number: itemNumber,
            })
          }
        }
        return itemArray
      }
      console.log(orders[orderIndex])
      orders[orderIndex]['item_list'] = insertItemArray()
      dispatch(InsertOrderPostInfo(orders))
    }
    dispatch(push(RouteDir+'/mypage/order_info'))
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: '買い物カゴ',
      href: '/mypage/cart_list'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="order_post_info_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="order_post_info_content">
          <h1>お届け先情報の入力</h1>
          <OrderFlow
            activeKey = {1}
          />
          <p className="introduction">お届け先の情報を入力してください。
            <button onClick={()=>dispatch(push(RouteDir+'/mypage/add_order_post_address'))}>ご自宅の住所を入力する</button>
          </p>
          <section className="list_type_3">
            <div className="order_card_box">
              <h2>お届け先</h2>
              {Array.isArray(orders) && orders.map((order,i)=>(
                <div key={i} className="order_card" data-id={i}>
                  <div className="post_info">
                    <h3>{order.myhouse_flag===1?'ご自宅':order.delivery_family_name+' '+order.delivery_first_name+'様'}</h3>
                    <p>
                      <span className="postal_code">〒{order.delivery_postal_code}</span>{order.delivery_address
                    }</p>
                    <p>{order.delivery_telnumber}</p>
                    <button className="delete_btn" onClick={()=>deleteConfirm(order.id)}>削除</button>
                  </div>
                  <div className="item_list">
                    <p>お届け商品の選択</p>
                    {Array.isArray(items) && items.map((item, i)=>(
                      <OrderInsertItemNumberList
                        key = {i}
                        index = {i}
                        item = {item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="btn_area">
              <button className="cart_list_link_btn" onClick={()=>dispatch(push(RouteDir+'/mypage/cart_list'))}>買い物カゴへ戻る</button>
              <button className="order_info_link_btn" onClick={()=>insertOrderBtn()}>発送・支払い方法を指定する</button>
            </div>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default CartList