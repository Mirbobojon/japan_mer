import {
  selectFavoriteListAction,
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir, RouteDir} from '../../common'

//お気に入り登録
export const insertFavorite = (itemId) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('item_id',itemId)
    params.append('formkey','insertkey')
    axios.post(ApiDir + '/insertFavorite.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はアラートを出してログイン画面に遷移
      {
        window.alert('お気に入り機能を使用するには、ログインを行ってください。')
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        window.alert('お気に入りに追加しました。')
        //store情報の変更
        dispatch(selectFavoriteListAction(response.data))
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

//お気に入り削除
export const deleteFavorite = (itemId) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('item_id',itemId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteFavorite.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はアラートを出してログイン画面に遷移
      {
        window.alert('お気に入り機能を使用するには、ログインを行ってください。')
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        console.log(response.data)
        window.alert('お気に入りを削除しました。')
        //store情報の変更
        dispatch(selectFavoriteListAction(response.data))
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