import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { push } from 'connected-react-router'
import { selectMailList, deleteMail, bulkOperationMail, changeNewAddFlagState, changeDestinationTypeState, changeTitleState, changeBodyState, deleteMailingList } from '../../reducks/mails/operations'
import { useDispatch, useSelector } from 'react-redux'
import { AdminsDir } from '../../common'
import queryString from 'query-string';


const MemberList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const mails = useSelector(state => state.mails.list)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')


  //一括操作の入力
  const [bulkOperation, setBulkOperation] = useState('')
  const inputBulkOperation = useCallback((event) =>
  {
    setBulkOperation(event.target.value)
  }, [setBulkOperation])

  useEffect(()=>
  {
    //メールマガジン新規作成フラグ操作
    dispatch(changeNewAddFlagState(false))

    //mailsStateの初期化
    dispatch(changeDestinationTypeState('1'))
    dispatch(changeTitleState(''))
    dispatch(changeBodyState(''))

    //管理者リストの取得、セット
    const selectMailprops = {
      Limit: -1,
      Offset: 0,
      Sort: ''
    }
    dispatch(selectMailList(selectMailprops))
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

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }

  const deleteConfirm = (Id) =>
  {
    const result = window.confirm('メールマガジンを削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteMail(Id))
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
    dispatch(bulkOperationMail(selectValue, selectCheckboxValue))
  }

  const addProcess = (value) =>
  {
    //メールマガジン新規作成フラグ操作
    dispatch(changeNewAddFlagState(value))
    dispatch(deleteMailingList([]))
    dispatch(push(AdminsDir+'/mails/add'))
  }


  return(
    <main id="member_list_page">
      <h2 className="page_title"><span>メールマガジン一覧</span></h2>
      <section className="sort_menu_area">
        <div className="left_group">
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>addProcess(true)}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>選択</th>
              <th>作成日</th>
              <th>宛先</th>
              <th>タイトル</th>
              <th>状態</th>
              <th>編集<br />削除</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(mails) && mails.map((mail, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={mail.id}/></td>
            <td className="datetime_box">
              {mail.insert_datetime !== ''?mail.insert_datetime:'-'}
            </td>
            <td className="destination_type_box name_box">
              {mail.destination_type === '1' && '希望者一斉送信'}
              {mail.destination_type === '2' && '会員一斉送信'}
              {mail.destination_type === '3' && <><span className="margin_right_10px">{mail.family_name !== ''?mail.family_name:'-'}</span>
              <span className="margin_right_10px">{mail.first_name !== ''?mail.first_name:'-'}</span>他</>}
            </td>
            <td className="title_box">
              {mail.title !== ''?mail.title:'-'}
            </td>
            <td className="status_box">
              {mail.status === 'draft' && '下書き'}
              {mail.status === 'sended' && '送信済'}
            </td>
            <td className="button_box">
              <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/mails/edit/' + mail.id}}>編集</button>
              <button className="delete_btn" onClick={()=>deleteConfirm(mail.id)}>削除</button>
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
              <option value="delete">削除</option>
            </select>
          </div>
          <div>
            <button onClick={()=>bulkOperationBtn()}>適用</button>
          </div>
        </div>
        <div className="right_group">
          <Paging
            length = {mails.length}
            paged = {paged}
            showCount = {showCount}
            prevtext = {'前へ'}
            nexttext = {'次へ'}
            slug = {'mails/list'}
          />
        </div>
      </section>
    </main>
  )
}

export default MemberList