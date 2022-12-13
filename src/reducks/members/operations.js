import {
  selectMemberListAction,
  changeApplicationMailAddressAction,
  loginMemberAction,
  logoutMemberAction,
  changeReissueMailAddressAction,
} from './actions'
import {selectFavoriteListAction} from '../favorites/actions'
import {selectCartListAction} from '../carts/actions'
import {selectOrderListAction} from '../orders/actions'
import {updateMoveToTopAfterLoginAction} from '../pageInfo2/actions'
import {
  changeLoadingAction,
} from '../pageInfos/actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { RouteDir, ApiDir, AdminsDir } from "../../common"


//会員登録
export const insertMember = (formData) =>
{
  return async (dispatch) =>
  {
    const password = formData.get('password')
    const re_password = formData.get('re_password')

    //バリデーション
    // if(password !== re_password)
    // {
    //   alert('パスワードが一致しません')
    //   return false
    // }

    axios.post(ApiDir + '/insertMember.php',formData)
    .then(function(response){
      if(response.data.result) {
        window.alert('会員情報を追加しました。')
        dispatch(push(AdminsDir+'/members/list'))
      } else {
        window.alert(response.data.message);
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

//会員情報一覧取得
export const selectMemberList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('limit',props.Limit)
    params.append('offset',props.Offset)
    params.append('sort',props.Sort)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectMemberList.php',params)
    .then(function(response){
      dispatch(selectMemberListAction(response.data))
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

//会員情報検索
export const searchMemberList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('member_name',props.MemberName)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/searchMemberList.php',params)
    .then(function(response){
      dispatch(selectMemberListAction(response.data))
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

//会員情報一括操作
export const bulkOperationMember = (selectValue, selectCheckboxValue) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_value',selectValue)
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationMember.php',params)
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

//会員情報削除
export const deleteMember = (id) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('member_id',id)
    params.append('formkey','deletekey')

    axios.post(ApiDir + '/deleteMember.php',params)
    .then(function(response){
      if(response)
      {
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

//会員情報更新
export const updateMember = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateMember.php',formData)
    .then(function(response){
      if(response.data.result) {
        window.alert('会員情報を変更しました。')
        dispatch(push(AdminsDir+'/members/list'))
      } else {
        window.alert(response.data.message);
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


//会員新規登録画面から一般ユーザによる会員新規登録申請処理
export const signupApplication = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir+'/signupApplication.php',formData)
    .then(function(response){
      dispatch(changeLoadingAction(false))
      if(response.data === 'registered')
      {
        window.alert('このメールアドレスは既に登録されています。')
      }
      else if(response.data === 'mail_send_done')
      {
        dispatch(push(RouteDir+'/signup_application_done'))
      }
      else
      {
        console.log(response.data)
      }
    })
    .catch(function(error){
      dispatch(changeLoadingAction(false))
      window.alert("エラー")
      console.log(error)
      return
    })
    .finally(function(){
      return
    })
  }
}


//一般ユーザーの会員登録
export const insertMemberForPublic = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertMemberForPublic.php',formData)
    .then(function(response){
      dispatch(changeLoadingAction(false))
      if(response.data === 'already_exists') {
        window.alert("登録済みのメールアドレスです。\nログインしてください。");
        dispatch(updateMoveToTopAfterLoginAction(true))
        dispatch(push(RouteDir+'/login'))
      } else if (response.data === 'mail_send_done') {
        // console.log(response.data)
        dispatch(push(RouteDir+'/signup_done'))
      } else {
        console.log(response.data)
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

//一般ユーザーの会員登録時のシリアルチェック
export const signupMemberCheck = (serial) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('serial',serial)
    params.append('formkey','checkkey')
    axios.post(ApiDir + '/checkSignupMember.php',params)
    .then(function(response){
      console.log(response.data)
      if(response.data==='overtime') {
        dispatch(push(RouteDir+'/signup_overtime'))
      } else if(response.data === 'already_exists') {
        window.alert("登録済みのメールアドレスです。\nログインしてください。")
        dispatch(updateMoveToTopAfterLoginAction(true))
        dispatch(push(RouteDir+'/login'))
      } else{
        dispatch(changeApplicationMailAddressAction(response.data))
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

//会員情報更新（マイページより操作）
export const updateMemberForPublic = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateMemberforPublic.php',formData)
    .then(function(response){
      if(response)
      {
        alert('会員情報を変更しました。')
        dispatch(push(RouteDir+'/'))
      }
      else
      {
        alert('会員情報の変更に失敗しました。')
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

//お届け先情報一括操作（マイページより操作）
export const bulkOperationDeliveryAddress = (selectValue, selectCheckboxValue) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_value',selectValue)
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationDeliveryAddress.php',params)
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

//お届け先情報削除
export const deleteDeliveryAddress = (id) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('id',id)
    params.append('formkey','deletekey')

    axios.post(ApiDir + '/deleteDeliveryAddress.php',params)
    .then(function(response){
      if(response)
      {
        window.alert('お届け先情報を削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('お届け先情報を削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//お届け先情報検索
export const searchDeleveryAddress = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('member_name',props.MemberName)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/searchDeliveryAddressList.php',params)
    .then(function(response){
      dispatch(selectMemberListAction(response.data))
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

//お届け先情報登録（マイページより操作）
export const insertDeliveryAddress = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertDeliveryAddress.php',formData)
    .then(function(response){
      console.log(response.data)
      window.alert('お届け先情報を追加しました。')
      dispatch(push(RouteDir+'/mypage/delivery_address_list'))
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

//お届け先情報更新（マイページより操作）
export const updateDeliveryAddress = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateDeliveryAddress.php',formData)
    .then(function(response){
      window.alert('お届け先情報を更新しました。')
      dispatch(push(RouteDir+'/mypage/delivery_address_list'))
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

//会員ログイン処理
export const loginMember = (formData, props, moveToTopAfterLogin) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/loginMember.php',formData)
    .then(function(response){
      if(response.data.length !== 0 && response.data !== 'error')
      {
        dispatch(loginMemberAction(response.data['login_member'][0]))
        dispatch(selectFavoriteListAction(response.data['favorite']))
        dispatch(selectCartListAction(response.data['cart']))
        if(props.location.state!==undefined)
        {
          sessionStorage.setItem('member_id', response.data['login_member'][0]['id'])
          dispatch(push(props.location.state.from))
        }
        else{
          //セッションストレージにログイン情報を追加
          sessionStorage.setItem('member_id', response.data['login_member'][0]['id'])
          if(moveToTopAfterLogin) {
            dispatch(updateMoveToTopAfterLoginAction(false))
            dispatch(push(RouteDir+'/'))
          } else {
            props.history.goBack()  //前のページにもどる
          }
        }
      }
      else
      {
        window.alert('ログインに失敗しました。メールアドレス、パスワードをお確かめください。')
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

//会員ログインチェック
export const LoginCheckMember = () =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','checkkey')
    axios.post(ApiDir + '/loginCheckMember.php', params)
    .then(function(response){
      if(response.data.length !== 0 && response.data !== 'nologin' && response.data !== 'error')
      {
    //セッションストレージにログイン情報を追加
        sessionStorage.setItem('member_id', response.data['login_member'][0]['id'])
        dispatch(loginMemberAction(response.data['login_member'][0]))
        dispatch(selectFavoriteListAction(response.data['favorite']))
        dispatch(selectCartListAction(response.data['cart']))
      }
      else
      {
        sessionStorage.removeItem('member_id')
        dispatch(logoutMemberAction())
        dispatch(selectFavoriteListAction([]))
        dispatch(selectCartListAction([]))
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

//会員ログアウト処理
export const logoutMember = () =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','logoutkey')
    axios.post(ApiDir + '/logoutMember.php', params)
    .then(function(response){
      console.log(response.data)
      sessionStorage.removeItem('member_id')
      dispatch(logoutMemberAction())
      dispatch(selectFavoriteListAction([]))
      dispatch(selectCartListAction([]))
      window.location.reload()
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

//会員パスワード再発行申請
export const insertReissueApplication = (FormData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertReissueApplicationByMember.php', FormData)
    .then(function(response){
      if(response.data === true) {
        dispatch(changeLoadingAction(false))
        dispatch(push(RouteDir+'/reissue_application_done'))
      } else if(response.data === "not_registered") {
        dispatch(changeLoadingAction(false))
        window.alert("このメールアドレスは登録されていません。")
      } else {
        dispatch(changeLoadingAction(false))
        window.alert("エラー")
      }
    })
    .catch(function(error){
      console.log(error)
      dispatch(changeLoadingAction(false))
      window.alert("エラー")
      return
    })
    .finally(function(){
      return
    })
  }
}

//会員パスワード再発行申請
export const changeMemberPasswordProcess = (FormData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertChangeMemberPasswordSerial.php', FormData)
    .then(function(response){
      if(response.data.serial) {
        dispatch(changeLoadingAction(false))
        dispatch(push(RouteDir+'/reissue/' + response.data.serial))
      } else {
        window.alert("サーバーエラーです。")
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

//会員パスワード変更
export const updateMemberPassword = (FormData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateMemberPassword.php', FormData)
    .then(function(response){
      if(response.data === true) {
        window.alert("パスワードを変更しました。\n新しいパスワードでログインしてください。")
        dispatch(updateMoveToTopAfterLoginAction(true))
        dispatch(push(RouteDir + "/login"))
      } else {
        window.alert("パスワード変更に失敗しました。\nもう一度再発行手続きを行ってください。")
        dispatch(push(RouteDir + "/reissue_application"))
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

//会員パスワード変更時のシリアルチェック
export const reissueCheck = (serial) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('serial',serial)
    params.append('formkey','checkkey')
    axios.post(ApiDir + '/checkReissue.php',params)
    .then(function(response){
      if(response.data==='overtime')
      {
        dispatch(push(RouteDir+'/reissue_overtime'))
      }
      else{
        dispatch(changeReissueMailAddressAction(response.data))
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


//買い物終了後にお届け先を追加
export const insertDeliveryAddressAfterShopping = (selectCheckboxValue) =>
{
  console.log(selectCheckboxValue)
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_value', 'insert')
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','insertkey')
    axios.post(ApiDir + '/insertDeliveryAddressAfterShopping.php',params)
    .then(function(response){
      console.log(response.data)
      dispatch(selectOrderListAction([]))
      dispatch(push(RouteDir))
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
