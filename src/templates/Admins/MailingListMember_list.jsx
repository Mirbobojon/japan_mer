import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { selectMemberList, searchMemberList } from '../../reducks/members/operations'
import { insertMailingListMember, bulkOperationMailingListMember } from '../../reducks/mailingListMembers/operations'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string';


const MemberList = (props) =>
{
  const pageItemId = props.match.params.id

  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const members = useSelector(state => state.members.list)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //検索会員名の入力
  const [memberName, setMemberName] = useState('')
  const inputMemberName = useCallback((event) =>
  {
    setMemberName(event.target.value)
  }, [setMemberName])

  useEffect(()=>
  {
    //管理者リストの取得、セット
    const selectMemberprops = {
      Limit: -1,
      Offset: 0,
      Sort: ''
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


  const searchMemberListBtn = () =>
  {
    //会員リストの取得、セット
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

  const addConfirm = (memberId) =>
  {
    dispatch(insertMailingListMember(pageItemId, memberId))
  }

  const bulkOperationBtn = () =>
  {
    const selectCheckbox = document.querySelectorAll("input[name=select_checkbox]:checked");
    let selectCheckboxValue = [];
    if(selectCheckbox)
    {
      for(let i=0;i<selectCheckbox.length;i++)
      {
        selectCheckboxValue.push(selectCheckbox[i].value)
      }
    }
    dispatch(bulkOperationMailingListMember(pageItemId, selectCheckboxValue))
  }


  return(
    <main id="mailing_list_member_list_page">
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
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>選択</th>
              <th>氏名</th>
              <th>メールアドレス</th>
              <th>追加</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(members) && members.map((member, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={member.id}/></td>
            <td className="name_box">
              <span className="margin_right_10px">{member.family_name !== ''?member.family_name:'-'}</span>
              <span>{member.first_name !== ''?member.first_name:'-'}</span>
            </td>
            <td className="mail_address_box">
              {member.mail_address !== ''?member.mail_address:'-'}
            </td>
            <td className="button_box">
              <button className="add_btn" onClick={()=>addConfirm(member.id)}>追加</button>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </section>
      <section className="under_menu_area">
        <div className="left_group">
          <div>
            <button style={InsertButtonStyle} className="add_btn" onClick={()=>bulkOperationBtn()}>追加</button>
          </div>
        </div>
        <div className="right_group">
          <Paging
            length = {members.length}
            paged = {paged}
            showCount = {showCount}
            prevtext = {'前へ'}
            nexttext = {'次へ'}
            slug = {'items/list'}
          />
        </div>
      </section>
    </main>
  )
}

export default MemberList