import {
  selectCartListAction,
} from './actions'
import axios from 'axios'
import {push} from 'connected-react-router'
import { ApiDir, RouteDir } from '../../common'


//買い物カゴ情報登録
export const insertCart = (itemId, quantity) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('item_id',itemId)
    params.append('quantity',quantity)
    params.append('formkey','insertkey')
    axios.post(ApiDir + '/insertCart.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はアラートを出してログイン画面に遷移
      {
        window.alert('買い物カゴに追加するには、ログインを行ってください。')
        dispatch(push(RouteDir+'/login'))
      } else {
        if(response.data.result) {
          window.alert('買い物カゴに追加しました。')
          //store情報の変更
          dispatch(selectCartListAction(response.data.cart_list))
        } else {
          if(response.data.message === "already_added") {
            window.alert("買い物カゴに追加済みの商品です。\n数量を変更する場合は、お手数ですが商品を削除後にもう一度追加してください。")
          }
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

//買い物カゴ情報削除
export const deleteCart = (cartId) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('cart_id',cartId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteCart.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はアラートを出してログイン画面に遷移
      {
        window.alert('買い物カゴ情報を変更するには、ログインを行ってください。')
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        window.alert('買い物カゴから削除しました。')
        //store情報の変更
        dispatch(selectCartListAction(response.data))
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

// 最新の買い物カゴ情報を取得
export const fetchLatestCartInfo = () => {
  return async (dispatch) => {
    let params = new URLSearchParams()
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectCart.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はアラートを出してログイン画面に遷移
      {
        window.alert('ログインしてください。')
        dispatch(push(RouteDir+'/login'))
      } else {
        if(response.data.cart_list) {
          //store情報の変更
          dispatch(selectCartListAction(response.data.cart_list))
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

//お届け先情報に商品情報を追加したオーダー情報を挿入
export const selectCartList = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(selectCartListAction(value))
  }
}
