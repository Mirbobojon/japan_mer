import {
  selectNewsListAction,
  imageSrcAction,
  imageIdAction,
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir, ImagesDir, NewsImageDir } from '../../common'


//お知らせ登録
export const insertNews = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertNews.php',formData)
    .then(function(response){
      window.alert('お知らせ情報を追加しました。')
      dispatch(push(AdminsDir+'/news/list'))
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

//お知らせ情報更新
export const updateNews = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateNews.php',formData)
    .then(function(response){
      if(response)
      {
        console.log(response.data)
        alert('お知らせ情報を変更しました。')
        dispatch(push(AdminsDir+'/news/list'))
      }
      else
      {
        alert('お知らせ情報の変更に失敗しました。')
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

//お知らせ情報一覧取得
export const selectNewsList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('limit',props.Limit)
    params.append('offset',props.Offset)
    params.append('sort',props.Sort)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectNewsList.php',params)
    .then(function(response){
      dispatch(selectNewsListAction(response.data))
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

//お知らせ情報削除
export const deleteNews = (newsId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('news_id',newsId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteNews.php',params)
    .then(function(response){
      if(response)
      {
        window.alert('お知らせ情報を削除しました。');
        window.location.reload()
      }
      else
      {
        window.alert('お知らせ情報を削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//お知らせ情報一括操作
export const bulkOperationNews = (selectValue, selectCheckboxValue) =>
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

//お知らせメイン画像取得
export const selectNewsMainImage = (newsId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams();
    params.append('news_id',newsId);
    params.append('kinds',1);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectNewsImage.php',params)
      .then(function(response){
        dispatch(imageSrcAction(NewsImageDir + response.data[0].path))
        dispatch(imageIdAction(response.data[0].id))
      })
      .catch(function(error){
        console.log(error)
        return
      })
  }
}





