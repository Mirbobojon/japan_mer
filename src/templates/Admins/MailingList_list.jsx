import React, { useEffect } from "react"
import { push } from 'connected-react-router'
import { selectMailingListList, deleteMailingList } from '../../reducks/mailingListMembers/operations'
import { useDispatch, useSelector } from 'react-redux'
import { AdminsDir } from '../../common'
import queryString from 'query-string';


const MemberList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const mailingLists = useSelector(state => state.mailingListMembers.mailingList)

  useEffect(()=>
  {
    //管理者リストの取得、セット
    const selectMailingListprops = {
      Limit: -1,
      Offset: 0,
      Sort: ''
    }
    dispatch(selectMailingListList(selectMailingListprops))

  },[dispatch, queryParam.paged])

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }


  const deleteConfirm = (Id) =>
  {
    const result = window.confirm('メーリングリストを削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteMailingList(Id))
    }
    else
    {
      return false
    }
  }


  return(
    <main id="mailing_list_list_page">
      <h2 className="page_title"><span>メーリングリスト一覧</span></h2>
      <section className="sort_menu_area">
        <div className="left_group">
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/mailing_lists/add'))}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>メーリングリストタイトル</th>
              <th>作成日</th>
              <th>編集<br />削除</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(mailingLists) && mailingLists.map((mailingList, i)=>
          (
            <tr key = {i}>
            <td className="title_box">
              {mailingList.title !== ''?mailingList.title:'-'}
            </td>
            <td className="datetime_box">
              {mailingList.insert_datetime !== ''?mailingList.insert_datetime:'-'}<br/>
            </td>
            <td className="button_box">
              <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/mailing_lists/edit/' + mailingList.id}}>編集</button>
              <button className="delete_btn" onClick={()=>deleteConfirm(mailingList.id)}>削除</button>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </section>
    </main>
  )
}

export default MemberList