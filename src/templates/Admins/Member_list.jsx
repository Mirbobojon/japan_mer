import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { push } from 'connected-react-router'
import { selectMemberList, searchMemberList, deleteMember, bulkOperationMember } from '../../reducks/members/operations'
import { useDispatch, useSelector } from 'react-redux'
import { AdminsDir } from '../../common'
import queryString from 'query-string';


const MemberList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const members = useSelector(state => state.members.list)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //検索商品名の入力
  const [memberName, setMemberName] = useState('')
  const inputMemberName = useCallback((event) =>
  {
    setMemberName(event.target.value)
  }, [setMemberName])

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
    //管理者リストの取得、セット
    const selectMemberprops = {
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectMemberList(selectMemberprops))
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

  const sortMemberList = () =>
  {
    //商品リストの取得、セット
    const selectMemberprops = {
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectMemberList(selectMemberprops))
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

  const searchMemberListBtn = () =>
  {
    //商品リストの取得、セット
    const searchMemberprops = {
      MemberName: memberName
    }
    dispatch(searchMemberList(searchMemberprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
  }

  const deleteConfirm = (memberId) =>
  {
    const result = window.confirm('会員情報を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteMember(memberId))
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
    dispatch(bulkOperationMember(selectValue, selectCheckboxValue))
  }


  return(
    <main id="member_list_page">
      <h2 className="page_title"><span>会員一覧</span></h2>
      <section className="search_area box_type_1">
        <div className="title_area">
          <h3>会員検索</h3>
        </div>
        <div className="content_area">
          <dl>
            <dt>会員名</dt>
            <dd>
              <input
                type = "text"
                name = "member_name"
                value = {memberName}
                onChange = {inputMemberName}
              />
            </dd>
            <dd className="right">
              <button onClick={()=>searchMemberListBtn()}>検索</button>
            </dd>
          </dl>
        </div>
      </section>
      <section className="sort_menu_area">
        <div className="left_group">
          <div>
            <select
              name = "sort_order"
              value = {sortOrder}
              onChange = {inputSortOrder}
            >
              <option value="">表示順</option>
              <option value="family_name_furigana ASC">フリガナ</option>
              <option value="insert_datetime DESC">登録日が新しい順</option>
              <option value="insert_datetime ASC">登録日が古い順</option>
            </select>
          </div>
          <div>
            <button onClick={()=>sortMemberList()}>変更</button>
          </div>
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/members/add'))}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>選択</th>
              <th>氏名<br/>フリガナ</th>
              <th>住所</th>
              <th>電話番号<br/>メールアドレス</th>
              <th>登録日<br />更新日</th>
              <th>編集<br />削除</th>
            </tr>
          </thead>
          <tbody>
          {members.length === 0 &&
            <p>該当なし</p>
          }
          {Array.isArray(members) && members.map((member, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={member.id}/></td>
            <td className="name_box">
              <span className="margin_right_10px">{member.family_name !== ''?member.family_name:'-'}</span>
              <span>{member.first_name !== ''?member.first_name:'-'}</span>
              <br />
              <span className="margin_right_10px">{member.family_name_furigana !== ''?member.family_name_furigana:'-'}</span>
              <span>{member.first_name_furigana !== ''?member.first_name_furigana:'-'}</span>
            </td>
            <td className="address_box">
              {member.address !== ''?member.address:'-'}
            </td>
            <td className="mail_address_box">
              {member.telnumber !== ''?member.telnumber:'-'}
              <br />
              {member.mail_address !== ''?member.mail_address:'-'}
            </td>
            <td className="datetime_box">
              {member.insert_datetime !== ''?member.insert_datetime:'-'}<br/>
              {member.update_datetime !== ''?member.update_datetime:'-'}
            </td>
            <td className="button_box">
              <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/members/edit/' + member.id}}>編集</button>
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
        <div className="right_group">
          {members.length !== 0 &&
            <Paging
              length = {members.length}
              paged = {paged}
              showCount = {showCount}
              prevtext = {'前へ'}
              nexttext = {'次へ'}
              slug = {'members/list'}
            />
          }
        </div>
      </section>
      <button className="back_btn" onClick={()=>{dispatch(push(AdminsDir + "/members/list")); window.location.reload()}}>一覧トップに戻る</button>
    </main>
  )
}

export default MemberList