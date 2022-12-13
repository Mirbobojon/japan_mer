import {
  selectMailingListListAction,
  selectMailingListMemberListAction,
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { RouteDir, ApiDir, AdminsDir } from "../../common"


//メーリングリスト登録
export const insertMailingList = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertMailingList.php',formData)
    .then(function(response){
      console.log(response.data)
      window.alert('メーリングリストを追加しました。')
      dispatch(push(AdminsDir+'/mailing_lists/list'))
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

//メーリングリスト情報一覧取得
export const selectMailingListList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('limit',props.Limit)
    params.append('offset',props.Offset)
    params.append('sort',props.Sort)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectMailingListList.php',params)
    .then(function(response){
      dispatch(selectMailingListListAction(response.data))
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

//商品情報検索
export const searchMailingList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mailing_list_title',props.MailingListTitle)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/searchMailingListList.php',params)
    .then(function(response){
      dispatch(selectMailingListListAction(response.data))
      return
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

//メーリングリスト情報一覧取得
export const selectMailingList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectMailingList.php',params)
    .then(function(response){
      console.log(response.data)
      dispatch(selectMailingListListAction(response.data))
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

//メーリングリスト情報削除
export const deleteMailingList = (id) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mailing_list_id',id)
    params.append('formkey','deletekey')

    axios.post(ApiDir + '/deleteMailingList.php',params)
    .then(function(response){
      if(response)
      {
        window.alert('メーリングリストを削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('メーリングリストを削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//メーリングリスト会員情報一括操作
export const bulkOperationMailingList = (selectValue, selectCheckboxValue) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_value',selectValue)
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationMailingList.php',params)
    .then(function(response){
      if(response)
      {
        window.location.reload()
      }
      else
      {
        window.alert('会員情報操作に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//メーリングリスト情報更新
export const updateMailingList = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateMailingList.php',formData)
    .then(function(response){
      if(response)
      {
        alert('メーリングリストを変更しました。')
        dispatch(push(AdminsDir+'/mailing_lists/list'))
      }
      else
      {
        alert('メーリングリストの変更に失敗しました。')
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

//メーリングリスト会員登録
export const insertMailingListMember = (mailingListId, memberId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mailing_list_id',mailingListId)
    params.append('member_id',memberId)
    params.append('formkey','insertkey')

    axios.post(ApiDir + '/insertMailingListMember.php',params)
    .then(function(response){
      window.alert('会員を追加しました。')
      dispatch(push(AdminsDir+'/mailing_lists/edit/'+ mailingListId))
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


//メーリングリスト会員情報一覧取得
export const selectMailingListMemberList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mailing_list_id',props.MailingListId)
    params.append('limit',props.Limit)
    params.append('offset',props.Offset)
    params.append('sort',props.Sort)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectMailingListMemberList.php',params)
    .then(function(response){
      dispatch(selectMailingListMemberListAction(response.data))
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


//メーリングリスト会員情報一括操作
export const bulkOperationMailingListMember = (mailingListId, selectCheckboxValue) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mailing_list_id',mailingListId)
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationMailingListMember.php',params)
    .then(function(response){
      if(response)
      {
        dispatch(push(AdminsDir+'/mailing_lists/edit/'+ mailingListId))
      }
      else
      {
        window.alert('会員情報操作に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}


//メーリングリスト会員情報削除
export const deleteMailingListMember = (id) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mailing_list_member_id',id)
    params.append('formkey','deletekey')

    axios.post(ApiDir + '/deleteMailingListMember.php',params)
    .then(function(response){
      if(response)
      {
        console.log(response.data)
        window.alert('会員情報を削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('会員情報を削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}




