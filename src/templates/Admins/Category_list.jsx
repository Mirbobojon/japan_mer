import React, { useEffect} from "react"
import { push } from 'connected-react-router'
import { selectCategoryList, deleteCategory } from '../../reducks/categories/operations'
import { useDispatch, useSelector } from 'react-redux'
import { AdminsDir} from '../../common'


const CategoryList = (props) =>
{
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.list)

  useEffect(()=>
  {
    dispatch(selectCategoryList())

  },[dispatch])

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }

  const deleteConfirm = (categoryId) =>
  {
    const result = window.confirm('カテゴリ情報を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteCategory(categoryId))
    }
    else
    {
      return false
    }
  }

  return(
    <main id="category_list_page">
      <h2 className="page_title"><span>カテゴリ一覧</span></h2>
      <section className="sort_menu_area">
        <div className="left_group">
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/categories/add'))}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>カテゴリ名</th>
              {/* <th>編集</th> */}
              {/* <th>編集<br />削除</th> */}
            </tr>
          </thead>
          <tbody>
          {Array.isArray(categories) && categories.map((category, i)=>
          (
            <tr key={i}>
              <td className="name_box">
                {category.name !== ''?category.name:'-'}
              </td>
              {/* <td className="button_box">
                <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/categories/edit/' + category.id}}>編集</button>
                <button className="delete_btn" onClick={()=>deleteConfirm(category.id)}>削除</button>
              </td> */}
            </tr>
          ))}
        </tbody>
        </table>
      </section>
    </main>
  )
}

export default CategoryList