import React, { useCallback,　useEffect, useState } from "react"
import { push } from 'connected-react-router'
import { updateMailingList, selectMailingListMemberList, deleteMailingListMember, bulkOperationMailingList } from '../../reducks/mailingListMembers/operations'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AdminsDir, ApiDir } from '../../common'


const ItemList = (props) =>
{
  const dispatch = useDispatch()
  const pageItemId = props.match.params.id

  const mailingListMembers = useSelector(state => state.mailingListMembers.list)

  //タイトルの入力
  const [titleValue, setTitleValue] = useState('')
  const inputTitleValue = useCallback((event) =>
  {
    setTitleValue(event.target.value)
    inputValueCheck()
  }, [setTitleValue])

  //一括操作の入力
  const [bulkOperation, setBulkOperation] = useState('')
  const inputBulkOperation = useCallback((event) =>
  {
    setBulkOperation(event.target.value)
  }, [setBulkOperation])

  useEffect(()=>{
    //メーリングリスト情報の取得
    let params = new URLSearchParams();
    params = new URLSearchParams();
    params.append('mailing_list_id',pageItemId);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectMailingList.php',params)
    .then(function(response){
      //各項目値のセット
      setTitleValue(response.data[0].title)
      inputValueCheck()
    })
    .catch(function(error){
      console.log(error)
      return
    })

    //メーリングリスト会員リストの取得、セット
    const selectMemberprops = {
      MailingListId: pageItemId,
      Limit: -1,
      Offset: 0,
      Sort: ''
    }
    dispatch(selectMailingListMemberList(selectMemberprops))
    inputValueCheck()
  },[dispatch, pageItemId])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfTitle = document.getElementsByName('title')

    if(inputValueOfTitle[0].value !== '')
    {
      document.getElementById('insert_btn').classList.remove('desabled')
    }
    else
    {
      document.getElementById('insert_btn').classList.add('desabled')
    }
  }

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','updatekey')
    formData.append('mailing_list_id',pageItemId)
    dispatch(updateMailingList(formData))
  }

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }

  const deleteConfirm = (Id) =>
  {
    const result = window.confirm('会員を除外してよろしいですか？')
    if(result)
    {
      dispatch(deleteMailingListMember(Id))
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
    dispatch(bulkOperationMailingList(selectValue, selectCheckboxValue))
  }

  return(
    <main id="mailing_list_edit_page">
      <h2 className="page_title"><span>メーリングリスト編集</span></h2>
      <section className="box_type_2">
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
            <dl>
              <dt>タイトル</dt>
              <dd>
                <input
                  type = "text"
                  name = {'title'}
                  maxLength="255"
                  value = {titleValue}
                  onChange = {inputTitleValue}
                />
              </dd>
            </dl>
          </form>
        </div>
        <section className="sort_menu_area">
        <div className="left_group">
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/mailing_list_members/list/'+pageItemId))}>新規登録</button>
          </div>
        </div>
      </section>
        <section className="list_area">
          <table>
            <thead>
              <tr>
                <th>選択</th>
                <th>氏名</th>
                <th>メールアドレス</th>
                <th>削除</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(mailingListMembers) && mailingListMembers.map((member, i)=>
            (
            <tr key = {i}>
              <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={member.id}/></td>
              <td className="name_box">
                <span className="margin_right_10px">{member.family_name !== ''?member.family_name:'-'}</span>
                <span>{member.first_name !== ''?member.first_name:'-'}</span>
              </td>
              <td className="mail_address_box">
                {member.mail_address !== ''?member.mail_address:'-'}<br/>
              </td>
              <td className="button_box">
                <button className="delete_btn" onClick={()=>deleteConfirm(member.id)}>削除</button>
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
      </section>
        <div className="button_area">
          <button id = "insert_btn" className="desabled" onClick={()=>sendFormData()}>登録</button>
        </div>
      </section>
    </main>
  )
}

export default ItemList