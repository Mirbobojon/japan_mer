import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { selectMailingListList, searchMailingList } from '../../reducks/mailingListMembers/operations'
import { bulkOperationMailingList } from '../../reducks/mails/operations'
import { useDispatch, useSelector } from 'react-redux'
import queryString from 'query-string';
import { push } from "connected-react-router"
import { AdminsDir } from "../../common"


const MemberList = (props) =>
{
  const pageItemId = props.match.params.id

  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const mailingLists = useSelector(state => state.mailingListMembers.mailingList)

  const selectedMailingLists = useSelector(state => state.mails.mailingList)

  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //検索会員名の入力
  const [mailingListTitle, setMailingListTitle] = useState('')
  const inputMailingListTitle = useCallback((event) =>
  {
    setMailingListTitle(event.target.value)
  }, [setMailingListTitle])

  useEffect(()=>
  {
    //管理者リストの取得、セット
    const selectMailingListprops = {
      Limit: -1,
      Offset: 0,
      Sort: ''
    }
    dispatch(selectMailingListList(selectMailingListprops))
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


  const searchMailingListBtn = () =>
  {
    //会員リストの取得、セット
    const searchMailprops = {
      MailingListTitle: mailingListTitle
    }
    dispatch(searchMailingList(searchMailprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
  }

  const bulkOperationBtn = () =>
  {
    const selectCheckbox = document.querySelectorAll("input[name=select_checkbox]:checked");
    let selectCheckboxValue = selectedMailingLists
    if(selectCheckbox)
    {
      for(let i=0;i<selectCheckbox.length;i++)
      {
        const dataTitle = selectCheckbox[i].dataset.title
        selectCheckboxValue.push({id:selectCheckbox[i].value,title:dataTitle})
      }
    }
    dispatch(bulkOperationMailingList(selectCheckboxValue, pageItemId))
  }

  const onBackBtnClicked = () => { 
    if(pageItemId === "new") {
      dispatch(push(AdminsDir + "/mails/add"))
    } else {
      dispatch(push(AdminsDir + "/mails/edit/" + pageItemId))
    }
  }

  return(
    <main id="mailing_list_member_list_page">
      <section className="search_area box_type_1">
        <div className="title_area">
          <h3>メーリングリスト検索</h3>
        </div>
        <div className="content_area">
          <dl>
            <dt>タイトル</dt>
            <dd>
              <input
                type = "text"
                name = "mailing_list_title"
                value = {mailingListTitle}
                onChange = {inputMailingListTitle}
              />
            </dd>
            <dd className="right">
              <button onClick={()=>searchMailingListBtn()}>検索</button>
            </dd>
          </dl>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>選択</th>
              <th>メーリングリストタイトル</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(mailingLists) && mailingLists.map((mailingList, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={mailingList.id} data-title={mailingList.title}/></td>
            <td className="title_box">
              {mailingList.title !== ''?mailingList.title:'-'}
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
            length = {mailingLists.length}
            paged = {paged}
            showCount = {showCount}
            prevtext = {'前へ'}
            nexttext = {'次へ'}
            slug = {'items/list'}
          />
        </div>
      </section>
      <button className="back_btn" onClick={()=>{onBackBtnClicked()}}>前の画面に戻る</button>
    </main>
  )
}

export default MemberList