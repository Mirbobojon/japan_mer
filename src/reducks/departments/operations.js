import {
  selectDepartmentListAction
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir} from '../../common'


//商品登録
export const insertDepartment = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertDepartment.php',formData)
    .then(function(response){
      window.alert('担当部署情報を追加しました。')
      dispatch(push(AdminsDir+'/departments/list'))
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

//担当部署情報更新
export const updateDepartment = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateDepartment.php',formData)
    .then(function(response){
      if(response)
      {
        alert('担当部署情報を変更しました。')
        dispatch(push(AdminsDir+'/departments/list'))
      }
      else
      {
        alert('担当部署情報の変更に失敗しました。')
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

//担当部署情報一覧取得
export const selectDepartmentList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectDepartmentList.php',params)
    .then(function(response){
      dispatch(selectDepartmentListAction(response.data))
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


//担当部署情報削除
export const deleteDepartment = (departmentId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('department_id',departmentId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteDepartment.php',params)
    .then(function(response){
      if(response)
      {
        window.alert('担当部署情報を削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('担当部署情報を削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}
