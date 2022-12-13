import {
  selectCategoryListAction
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir} from '../../common'


//商品登録
export const insertCategory = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertCategory.php',formData)
    .then(function(response){
      window.alert('カテゴリ情報を追加しました。')
      dispatch(push(AdminsDir+'/categories/list'))
    })
    .catch(function(error){
      console.log(error)
      return
    })
    .finally(function(){
      return
    })
  }
}

//カテゴリ情報更新
export const updateCategory = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateCategory.php',formData)
    .then(function(response){
      if(response)
      {
        alert('カテゴリ情報を変更しました。')
        dispatch(push(AdminsDir+'/categories/list'))
      }
      else
      {
        alert('カテゴリ情報の変更に失敗しました。')
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
    .finally(function(){
      return
    })
  }
}

//カテゴリ情報一覧取得
export const selectCategoryList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectCategoryList.php',params)
    .then(function(response){
      dispatch(selectCategoryListAction(response.data))
    })
    .catch(function(error){
      console.log(error)
      return
    })
    .finally(function(){
      return
    })
  }
}


//カテゴリ情報削除
export const deleteCategory = (categoryId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('category_id',categoryId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteCategory.php',params)
    .then(function(response){
      if(response)
      {
        window.alert('カテゴリ情報を削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('カテゴリ情報を削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}
