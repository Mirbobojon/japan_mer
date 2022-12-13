import React, { useEffect } from "react"
import { push } from 'connected-react-router'
import { selectDepartmentList, deleteDepartment } from '../../reducks/departments/operations'
import { useDispatch, useSelector } from 'react-redux'
import { AdminsDir } from '../../common'


const DepartmentList = (props) => {
  const dispatch = useDispatch()
  const departments = useSelector(state => state.departments.list)

  useEffect(() => {
    dispatch(selectDepartmentList())

  }, [dispatch])

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }

  const deleteConfirm = (categoryId) => {
    const result = window.confirm('担当部署情報を削除してよろしいですか？')
    if (result) {
      dispatch(deleteDepartment(categoryId))
    }
    else {
      return false
    }
  }

  return (
    <main id="category_list_page">
      <h2 className="page_title"><span>担当部署一覧</span></h2>
      <section className="sort_menu_area">
        <div className="left_group">
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={() => dispatch(push(AdminsDir + '/departments/add'))}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>担当部署名</th>
              <th>編集</th>
              {/* <th>編集<br />削除</th> */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(departments) && departments.map((category, i) =>
            (
              <tr key={i}>
                <td className="name_box">
                  {category.name !== '' ? category.name : '-'}
                </td>
                <td className="button_box">
                  <button className="update_btn" onClick={() => { window.location = AdminsDir + '/departments/edit/' + category.id }}>編集</button>
                  {/* <button className="delete_btn" onClick={() => deleteConfirm(category.id)}>削除</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default DepartmentList