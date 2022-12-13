import {
  selectMailAction,
  selectMailListAction,
  selectMailingListAction,
  changeNewAddFlagStateAction,
  changeDestinationTypeStateAction,
  changeTitleStateAction,
  changeBodyStateAction
} from './actions'
import {
  changeLoadingAction,
} from '../pageInfos/actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir, RouteDir} from '../../common'


//メルマガ登録
export const insertMail = (formData) =>
{
  return async (dispatch) =>
  {
    const sendType = formData.get('send_type')
    axios.post(ApiDir + '/insertMail.php',formData)
    .then(function(response){
      if(sendType === 'save')
      {
        dispatch(changeLoadingAction(false))
        window.alert('メールマガジンを保存しました。')
      }
      else if(sendType === 'send')
      {
        dispatch(changeLoadingAction(false))
        window.alert('メールマガジンを送信しました。')
      }
      dispatch(push(AdminsDir+'/mails/list'))
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

//メールマガジン情報更新
export const updateMail = (formData) =>
{
  return async (dispatch) =>
  {
    const sendType = formData.get('send_type')
    axios.post(ApiDir + '/updateMail.php',formData)
    .then(function(response){
      console.log(response.data)
      if(response)
      {
        if(sendType === 'save')
        {
          dispatch(changeLoadingAction(false))
          window.alert('メールマガジンを保存しました。')
        }
        else if(sendType === 'send')
        {
          dispatch(changeLoadingAction(false))
          window.alert('メールマガジンを送信しました。')
        }
        dispatch(push(AdminsDir+'/mails/list'))
      }
      else
      {
        if(sendType === 'save')
        {
          window.alert('メールマガジンを保存に失敗しました。')
        }
        else if(sendType === 'send')
        {
          window.alert('メールマガジンを送信に失敗しました。')
        }
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

//メールマガジン情報取得
export const selectMail = (Id) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mail_id',Id)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectMail.php',params)
    .then(function(response){
      if(response)
      {
        dispatch(selectMailAction(response.data[0]))
      }
      else
      {
        console.log(response.data)
        return
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

export const selectMailRecipients = (Id) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mail_id',Id)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectMailRecipient.php',params)
    .then(function(response){
      if(response)
      {
        dispatch(selectMailingListAction(response.data))
      }
      else
      {
        console.log(response.data)
        return
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

//メールマガジン情報一覧取得
export const selectMailList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectMailList.php',params)
    .then(function(response){
      dispatch(selectMailListAction(response.data))
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

//メールマガジン情報削除
export const deleteMail = (mailId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('mail_id',mailId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteMail.php',params)
    .then(function(response){
      console.log(response.data)
      if(response)
      {
        window.alert('メールマガジンを削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('メールマガジンの削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//メールマガジン情報一括操作
export const bulkOperationMail = (selectValue, selectCheckboxValue) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_value',selectValue)
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationNews.php',params)
    .then(function(response){
      if(response)
      {
        window.location.reload()
      }
      else
      {
        window.alert('お知らせ情報操作に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}


//メーリングリスト会員情報一括操作
export const bulkOperationMailingList = (selectCheckboxValue, Id) =>
{
  return async (dispatch) =>
  {
    dispatch(selectMailingListAction(selectCheckboxValue))
    if(Id === 'new')
    {
      dispatch(push(AdminsDir+'/mails/add'))
    }
    else
    {
      dispatch(push(AdminsDir+'/mails/edit/'+ Id))
    }
  }
}


//メーリングリスト会員情報一括操作
export const deleteMailingList = (newMailingListArray) =>
{
  return async (dispatch) =>
  {
    dispatch(selectMailingListAction(newMailingListArray))
  }
}

//メールマガジン新規作成フラグ操作
export const changeNewAddFlagState = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(changeNewAddFlagStateAction(value))
  }
}

//メールマガジン新規作成時宛先操作
export const changeDestinationTypeState = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(changeDestinationTypeStateAction(value))
  }
}

//メールマガジン新規作成時タイトル操作
export const changeTitleState = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(changeTitleStateAction(value))
  }
}

//メールマガジン新規作成時本文操作
export const changeBodyState = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(changeBodyStateAction(value))
  }
}

//問い合わせメール送信
export const sendContactMail = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/sendContactMail.php',formData)
    .then(function(response){
      dispatch(changeLoadingAction(false))
      if(response.data)
      {
        dispatch(push(RouteDir+'/contact_done'))
      }
      else
      {
        window.alert('メール送信に失敗しました。')
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