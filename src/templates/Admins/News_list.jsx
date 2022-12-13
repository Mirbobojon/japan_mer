import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { push } from 'connected-react-router'
import { selectNewsList, deleteNews, bulkOperationNews } from '../../reducks/news/operations'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AdminsDir, ApiDir, ImagesDir } from '../../common'
import queryString from 'query-string';


const NewsList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const news = useSelector(state => state.news.list)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //表示順の入力
  const [sortOrder, setSortOrder] = useState('id DESC')
  const inputSortOrder = useCallback((event) =>
  {
    setSortOrder(event.target.value)
  }, [setSortOrder])

  //一括操作の入力
  const [bulkOperation, setBulkOperation] = useState('')
  const inputBulkOperation = useCallback((event) =>
  {
    setBulkOperation(event.target.value)
  }, [setBulkOperation])

  useEffect(()=>
  {
    //お知らせリストの取得、セット
    const selectNewsprops = {
      Limit: -1,
      Offset: 0,
      Sort: sortOrder,
    }
    dispatch(selectNewsList(selectNewsprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(20) //１ページに表示する数


  },[dispatch,queryParam.paged])

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }

  const sortNewsList = () =>
  {
    //お知らせリストの取得、セット
    const selectNewsprops = {
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectNewsList(selectNewsprops))
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

  const deleteConfirm = (newsId) =>
  {
    const result = window.confirm('お知らせ情報を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteNews(newsId))
    }
    else
    {
      return false
    }
  }

  const bulkOperationBtn = () =>
  {
    const selectValue = document.getElementById('select_bulk_operation').value;
    const selectCheckbox = document.querySelectorAll("input[name=select_checkbox]:checked");
    let selectCheckboxValue = [];
    if(selectCheckbox)
    {
      for(let i=0;i<selectCheckbox.length;i++)
      {
        selectCheckboxValue.push(selectCheckbox[i].value)
      }
    }
    dispatch(bulkOperationNews(selectValue, selectCheckboxValue))
  }


  return(
    <main id="news_list_page">
      <h2 className="page_title"><span>お知らせ一覧</span></h2>
      <section className="sort_menu_area">
        <div className="left_group">
          <div>
            <select
              name = "sort_order"
              value = {sortOrder}
              onChange = {inputSortOrder}
            >
              <option value="">表示順</option>
              <option value="insert_datetime DESC">作成日が新しい順</option>
              <option value="insert_datetime ASC">作成日が古い順</option>
            </select>
          </div>
          <div>
            <button onClick={()=>sortNewsList()}>変更</button>
          </div>
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/news/add'))}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>選択</th>
              <th>作成日</th>
              <th>タイトル</th>
              <th>状態</th>
              <th>編集<br />削除</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(news) && news.map((news, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={news.id}/></td>
            <td className="insert_datetime_box">
              {news.insert_datetime !== ''?news.insert_datetime:'-'}
            </td>
            <td className="title_box">
              {news.title !== ''?news.title:'-'}
            </td>
            <td className="status_box">
              {news.status === 'draft' && '下書き'}
              {news.status === 'public' && '公開'}
              {news.status === 'privete' && '非公開'}
            </td>
            <td className="button_box">
              <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/news/edit/' + news.id}}>編集</button>
              <button className="delete_btn" onClick={()=>deleteConfirm(news.id)}>削除</button>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </section>
      <section className="under_menu_area">
        <div className="left_group">
          <div>
            <select
              id = "select_bulk_operation"
              name = "bulk_operation"
              value = {bulkOperation}
              onChange = {inputBulkOperation}
            >
              <option value="">一括操作</option>
              <option value="public">公開</option>
              <option value="privete">非公開</option>
              <option value="draft">下書き</option>
              <option value="delete">削除</option>
            </select>
          </div>
          <div>
            <button onClick={()=>bulkOperationBtn()}>適用</button>
          </div>
        </div>
        <div className="right_group">
          <Paging
            length = {news.length}
            paged = {paged}
            showCount = {showCount}
            prevtext = {'前へ'}
            nexttext = {'次へ'}
            slug = {'news/list'}
          />
        </div>
      </section>
    </main>
  )
}

export default NewsList