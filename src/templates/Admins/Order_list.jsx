import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { push } from 'connected-react-router'
import { selectAllOrderList } from '../../reducks/orders/operations'
import { useDispatch, useSelector } from 'react-redux'
import { AdminsDir, RouteDir } from '../../common'
import queryString from 'query-string';


const MemberList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders.allOrder)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //検索商品名の入力
  const [name, setName] = useState('')
  const inputName = useCallback((event) =>
  {
    setName(event.target.value)
  }, [setName])

  //表示順の入力
  const [sortOrder, setSortOrder] = useState('')
  const inputSortOrder = useCallback((event) =>
  {
    setSortOrder(event.target.value)
  }, [setSortOrder])

  useEffect(()=>
  {
    //注文情報リストの取得、セット
    const selectOrderprops = {
      Name: name,
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectAllOrderList(selectOrderprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(20) //１ページに表示する数

  },[dispatch, queryParam.paged])


  const sortOrderList = () =>
  {
    //注文情報リストの取得、セット
    const selectOrderprops = {
      Name: name,
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectAllOrderList(selectOrderprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    return
  }

  const searchOrderListBtn = () =>
  {
    //商品リストの取得、セット
    const searchOrderprops = {
      Name: name,
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectAllOrderList(searchOrderprops))
  }



  return(
    <main id="order_list_page">
      <h2 className="page_title"><span>受注配送一覧</span></h2>
      <section className="search_area box_type_1">
        <div className="title_area">
          <h3>検索</h3>
        </div>
        <div className="content_area">
          <dl>
            <dt>氏名（フリガナ可）</dt>
            <dd>
              <input
                type = "text"
                name = "name"
                value = {name}
                onChange = {inputName}
              />
            </dd>
            <dd className="right">
              <button onClick={()=>searchOrderListBtn()}>検索</button>
            </dd>
          </dl>
        </div>
      </section>
      {/* <section className="sort_menu_area">
        <div className="left_group">
          <div>
            <select
              name = "sort_order"
              value = {sortOrder}
              onChange = {inputSortOrder}
            >
              <option value="">表示順</option>
              <option value="members.family_name_furigana ASC">フリガナ</option>
              <option value="orders.insert_datetime DESC">登録日が新しい順</option>
              <option value="orders.insert_datetime ASC">登録日が古い順</option>
            </select>
          </div>
          <div>
            <button onClick={()=>sortOrderList()}>変更</button>
          </div>
        </div>
        <div className="right_group"></div>
      </section> */}
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>注文日</th>
              {/* <th>状況</th> */}
              <th>注文者氏名</th>
              <th>注文者<br/>電話番号</th>
              <th>注文内容</th>
              <th>注文数</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
          {orders.length === 0 &&
            <p>該当なし</p>
          }
          {Array.isArray(orders) && orders.map((order, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
              <td>{order.insert_datetime}</td>
              {/* <td>
                {order.status==='1'&&'入金待ち'}
                {order.status==='2'&&'支払済み'}
              </td> */}
              <td>{order.family_name}&ensp;{order.first_name}</td>
              <td>
                {order.telnumber !== ""
                  ? order.telnumber
                  : "-"
                }
              </td>
              <td>
                注文番号：{order.order_number}<br/>
                商品名：{order.name}
              </td>
              <td>{order.quantity}</td>
              <td><button onClick={()=>dispatch(push(AdminsDir+'/orders/edit/'+order.order_id))}>詳細</button></td>
            </tr>
          ))}
        </tbody>
        </table>
      </section>
      <section className="under_menu_area">
        <div className="left_group"></div>
        <div className="right_group">
          {orders.length !== 0 &&
            <Paging
                length = {orders.length}
                paged = {paged}
                showCount = {showCount}
                prevtext = {'前へ'}
                nexttext = {'次へ'}
                slug = {'orders/list'}
              />
          }
        </div>
      </section>
      <button className="back_btn" onClick={()=>{dispatch(push(AdminsDir + "/orders/list")); window.location.reload()}}>一覧トップに戻る</button>
    </main>
  )
}

export default MemberList