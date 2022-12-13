import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { push } from 'connected-react-router'
import { selectAdminList, deleteAdmin, bulkOperationAdmin } from '../../reducks/admins/operations'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AdminsDir, ApiDir, ImagesDir } from '../../common'
import queryString from 'query-string';


const AdminList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const admins = useSelector(state => state.admins.list)
  const myAdminId = useSelector(state => state.admins.admin_id)

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
    //管理者リストの取得、セット
    const selectAdminprops = {
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectAdminList(selectAdminprops))
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

  const sortAdminList = () =>
  {
    //商品リストの取得、セット
    const selectAdminprops = {
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectAdminList(selectAdminprops))
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

  const deleteConfirm = (itemId) =>
  {
    const result = window.confirm('管理者情報を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteAdmin(itemId))
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
    dispatch(bulkOperationAdmin(selectValue, selectCheckboxValue))
  }


  return(
    <main id="admin_list_page">
      <h2 className="page_title"><span>管理者一覧</span></h2>
      <section className="sort_menu_area">
        <div className="left_group">
          <div>
            <select
              name = "sort_order"
              value = {sortOrder}
              onChange = {inputSortOrder}
            >
              <option value="">表示順</option>
              <option value="department_id ASC">担当部署</option>
              <option value="insert_datetime DESC">登録日が新しい順</option>
            </select>
          </div>
          <div>
            <button onClick={()=>sortAdminList()}>変更</button>
          </div>
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/admins/add'))}>新規登録</button>
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
              <th>担当部署</th>
              <th>権限<br/>状態</th>
              <th>登録日<br />更新日</th>
              <th>編集<br />削除</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(admins) && admins.map((admin, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box">
              {admin.id !== myAdminId
                ? <input type="checkbox" name="select_checkbox" value={admin.id}/>
                : "-"
              }
            </td>
            <td className="name_box">
              {admin.name !== ''?admin.name:'-'}
            </td>
            <td className="mail_address_box">
              {admin.mail_address !== ''?admin.mail_address:'-'}
            </td>
            <td className="department_box">
              {admin.department_name !== ''?admin.department_name:'-'}
            </td>
            <td className="status_box">
              {admin.authority_name !== ''?admin.authority_name:'-'}<br/>
              {admin.status === '0' && '無効'}
              {admin.status === '1' && '有効'}
            </td>
            <td className="datetime_box">
              {admin.insert_datetime !== ''?admin.insert_datetime:'-'}<br/>
              {admin.update_datetime !== ''?admin.update_datetime:'-'}
            </td>
            <td className="button_box">
              <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/admins/edit/' + admin.id}}>編集</button>
              {admin.id !== myAdminId
                ? <button className="delete_btn" onClick={()=>deleteConfirm(admin.id)}>削除</button>
                : "ログイン中"
              }
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
              <option value="status_0">無効</option>
              <option value="status_1">有効</option>
            </select>
          </div>
          <div>
            <button onClick={()=>bulkOperationBtn()}>適用</button>
          </div>
        </div>
        <div className="right_group">
          <Paging
            length = {admins.length}
            paged = {paged}
            showCount = {showCount}
            prevtext = {'前へ'}
            nexttext = {'次へ'}
            slug = {'admins/list'}
          />
        </div>
      </section>
    </main>
  )
}

export default AdminList