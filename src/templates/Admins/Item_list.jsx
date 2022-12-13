import React, {  useCallback, useEffect, useState } from "react"
import { Paging } from '../../components/UIkit'
import { push } from 'connected-react-router'
import { selectItemList, searchItemList, deleteItem, bulkOperationItem } from '../../reducks/items/operations'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AdminsDir, ApiDir, ImagesDir, ItemImageDir } from '../../common'
import queryString from 'query-string';

const ItemList = (props) =>
{
  //ページング用 パラメータの取得
  const queryParam = queryString.parse(props.location.search)

  const dispatch = useDispatch()
  const items = useSelector(state => state.items.list)

  const [sortCategories, setSortCategories] = useState([]);
  const [paged, setPaged] = useState('')
  const [showCount, setShowCount] = useState('')

  //検索商品名の入力
  const [itemName, setItemName] = useState('')
  const inputItemName = useCallback((event) =>
  {
    setItemName(event.target.value)
  }, [setItemName])

  //並び替えカテゴリの入力
  const [selectCategory, setSelectCategory] = useState('')
  const inputSelectCategory = useCallback((event) =>
  {
    setSelectCategory(event.target.value)
  }, [setSelectCategory])

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
    //商品リストの取得、セット
    const selectItemprops = {
      Category: '',
      Limit: -1,
      Offset: 0,
      Sort: sortOrder,
      Auth: ''
    }
    dispatch(selectItemList(selectItemprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
    setShowCount(10) //１ページに表示する数

    //商品カテゴリの取得、セット
    let params = new URLSearchParams();
    //カテゴリー取得
    params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectCategoryList.php',params)
    .then(function(response){
      setSortCategories(response.data)
      return
    })
    .catch(function(error){
      console.log(error)
      return
    })

  },[dispatch,queryParam.paged])

  const InsertButtonStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/insert_icon.png')`
  }

  const sortItemList = () =>
  {
    //商品リストの取得、セット
    const selectItemprops = {
      Category: selectCategory,
      Limit: -1,
      Offset: 0,
      Sort: sortOrder
    }
    dispatch(selectItemList(selectItemprops))
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

  const searchItemListBtn = () =>
  {
    //商品リストの取得、セット
    const searchItemprops = {
      ItemName: itemName
    }
    dispatch(searchItemList(searchItemprops))
    if(queryParam.paged)
    {
      setPaged(queryParam.paged)
    }
    else
    {
      setPaged(1)
    }
  }

  const deleteConfirm = (itemId) =>
  {
    const result = window.confirm('商品情報を削除してよろしいですか？')
    if(result)
    {
      dispatch(deleteItem(itemId))
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
    dispatch(bulkOperationItem(selectValue, selectCheckboxValue))
  }


  return(
    <main id="item_list_page">
      <h2 className="page_title"><span>商品一覧</span></h2>
      <section className="search_area box_type_1">
        <div className="title_area">
          <h3>商品検索</h3>
        </div>
        <div className="content_area">
          <dl>
            <dt>商品名</dt>
            <dd>
              <input
                type = "text"
                name = "item_name"
                maxLength="255"
                value = {itemName}
                onChange = {inputItemName}
              />
            </dd>
            <dd className="right">
              <button onClick={()=>searchItemListBtn()}>検索</button>
            </dd>
          </dl>
        </div>
      </section>
      <section className="sort_menu_area">
        <div className="left_group">
          <div>
            <select
              name = "sort_category"
              value = {selectCategory}
              onChange = {inputSelectCategory}
            >
              <option value="">すべて</option>
              {Array.isArray(sortCategories) && sortCategories.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
            </select>
          </div>
          <div>
            <select
              name = "sort_order"
              value = {sortOrder}
              onChange = {inputSortOrder}
            >
              <option value="">表示順</option>
              <option value="name ASC">商品名</option>
              <option value="insert_datetime DESC">登録日が新しい順</option>
              <option value="insert_datetime ASC">登録日が古い順</option>
            </select>
          </div>
          <div>
            <button onClick={()=>sortItemList()}>変更</button>
          </div>
        </div>
        <div className="right_group">
          <div>
            <button style={InsertButtonStyle} onClick={()=>dispatch(push(AdminsDir+'/items/add'))}>新規登録</button>
          </div>
        </div>
      </section>
      <section className="list_area">
        <table>
          <thead>
            <tr>
              <th>選択</th>
              <th>商品画像</th>
              <th>商品名</th>
              <th>カテゴリ</th>
              <th>税抜価格</th>
              <th>在庫数</th>
              <th>担当</th>
              <th>公開状態</th>
              <th>登録日<br />更新日</th>
              <th>編集<br />削除</th>
            </tr>
          </thead>
          <tbody>
          {items.length === 0 &&
            <p>該当なし</p>
          }
          {Array.isArray(items) && items.map((item, i)=>
          (
            (showCount * (paged - 1)) <= i && i < (showCount * paged) &&
            <tr key = {i}>
            <td className="checkbox_box"><input type="checkbox" name="select_checkbox" value={item.id}/></td>
            <td className="image_box">
            {item.image_path !== ''?
              <div className="thumbnail_area" style={item.path!==null?{backgroundImage:`url('${ItemImageDir}${item.path}')`}:{backgroundImage:`url('${process.env.PUBLIC_URL}/images/noimage.jpg')`}}></div>:
              <div className="thumbnail_area"></div>
            }
            </td>
            <td className="name_box">
              {item.name !== ''?item.name:'-'}
            </td>
            <td className="category_box">
              {item.category_name !== ''?item.category_name:'-'}
            </td>
            <td className="price_box">
              {item.price !== ''? "\\" + Number(item.price).toLocaleString():'-'}
            </td>
            <td className="stock_quantity_box">
              {item.stock_quantity !== ''? Number(item.stock_quantity).toLocaleString():'-'}
            </td>
            <td className="department_box">
              {item.department_name !== ''?item.department_name:'-'}
            </td>
            <td className="status_box">
              {item.status === 'draft' && '下書き'}
              {item.status === 'public' && '公開'}
              {item.status === 'private' && '非公開'}
            </td>
            <td className="datetime_box">
              {item.insert_datetime !== ''?item.insert_datetime:'-'}<br/>
              {item.update_datetime !== ''?item.update_datetime:'-'}
            </td>
            <td className="button_box">
              <button className="update_btn" onClick={()=>{window.location = AdminsDir + '/items/edit/' + item.id}}>編集</button>
              <button className="delete_btn" onClick={()=>deleteConfirm(item.id)}>削除</button>
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
          {items.length !== 0 &&
            <Paging
              length = {items.length}
              paged = {paged}
              showCount = {showCount}
              prevtext = {'前へ'}
              nexttext = {'次へ'}
              slug = {'items/list'}
            />
          }
        </div>
      </section>
      <button className="back_btn" onClick={()=>{dispatch(push(AdminsDir + "/items/list")); window.location.reload()}}>一覧トップに戻る</button>
    </main>
  )
}

export default ItemList