import {
  selectItemListAction,
  imageSrcAction,
  imageIdAction,
  imageSrcArrayAction,
  imageIdArrayAction,
  changeCategoryAction,
  changeKeywordAction,
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir, ImagesDir, ItemImageDir, RouteDir } from '../../common'
import { changeLoading } from '../pageInfos/operations'


//商品登録
export const insertItem = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/insertItem.php',formData)
    .then(function(response){
      if(response.data === true) {
        window.alert('商品情報を登録しました。')
        dispatch(push(AdminsDir+'/items/list'))
      } else {
        window.alert('商品情報の登録に失敗しました。')
        document.getElementById("insert_btn").disabled = false
      }
    })
    .catch(function(error){
      console.log(error)
      document.getElementById("insert_btn").disabled = false
      return
    })
    .finally(function(){
      dispatch(changeLoading(false))
      return
    })
  }
}

//商品情報更新
export const updateItem = (formData) =>
{
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateItem.php',formData)
    .then(function(response){
      console.log(response.data)
      if(response.data === true) {
        window.alert('商品情報を変更しました。')
        dispatch(push(AdminsDir+'/items/list'))
      } else {
        window.alert('商品情報の変更に失敗しました。')
        document.getElementById("insert_btn").disabled = false
      }
    })
    .catch(function(error){
      console.log(error)
      document.getElementById("insert_btn").disabled = false
      return
    })
    .finally(function(){
      dispatch(changeLoading(false))
      return
    })
  }
}

//商品情報一覧取得
export const selectItemList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('category',props.Category)
    params.append('limit',props.Limit)
    params.append('offset',props.Offset)
    params.append('sort',props.Sort)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/selectItemList.php',params)
    .then(function(response){
      dispatch(selectItemListAction(response.data))
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
export const searchItemList = (props) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('item_name',props.ItemName)
    params.append('formkey','selectkey')

    axios.post(ApiDir+'/searchItemList.php',params)
    .then(function(response){
      dispatch(selectItemListAction(response.data))
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


//商品情報削除
export const deleteItem = (itemId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('item_id',itemId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteItem.php',params)
    .then(function(response){
      if(response.data === true) {
        window.alert('商品情報を削除しました。');
        window.location.reload()
      } else {
        window.alert('商品情報の削除に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//商品情報一括操作
export const bulkOperationItem = (selectValue, selectCheckboxValue) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_value',selectValue)
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationItem.php',params)
    .then(function(response){
      if(response)
      {
        console.log(response.data)
        window.location.reload()
      }
      else
      {
        window.alert('商品情報操作に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}


//商品メイン画像取得
export const selectItemMainImage = (itemId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams();
    params.append('item_id',itemId);
    params.append('kinds',1);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectItemImage.php',params)
      .then(function(response){
        dispatch(imageSrcAction(ItemImageDir + response.data[0].path))
        dispatch(imageIdAction(response.data[0].id))
      })
      .catch(function(error){
        console.log(error)
        return
      })
  }
}

//商品画像取得
export const selectItemImage = (itemId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams();
    params.append('item_id',itemId);
      params.append('kinds',2);
      params.append('formkey','selectkey');
      axios.post(ApiDir+'/selectItemImage.php',params)
      .then(function(response){
        let imageSrcArray = ["", "", "", ""]
        let imageIdArray = ["", "", "", ""]
        
        for(let i=0; i<4; i++) {
          if(i in response.data) {
            const imgNum = Number(response.data[i].img_num) - 1
            imageSrcArray[imgNum] = ItemImageDir + response.data[i].path
            imageIdArray[imgNum] = response.data[i].id
          }
        }

        // console.log(response.data);
        // console.log(imageIdArray, imageSrcArray);
        dispatch(imageSrcArrayAction(imageSrcArray))
        dispatch(imageIdArrayAction(imageIdArray))
      })
      .catch(function(error){
        console.log(error)
        return
      })
  }
}


//公開済み商品一覧の取得
export const selectPublicItemList = (category, keyword) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams();
    params.append('category',category);
    params.append('keyword',keyword);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectPublicItemList.php',params)
    .then(function(response){
      console.log(response.data)
      // dispatch(changeCategoryAction(category))
      // dispatch(changeKeywordAction(keyword))
      dispatch(selectItemListAction(response.data))
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//商品一覧に戻る時に、全商品を表示するように遷移する処理
export const itemListLink = () =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams();
    params.append('category', '');
    params.append('keyword', '');
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectPublicItemList.php',params)
    .then(function(response){
      console.log(response.data)
      // dispatch(changeCategoryAction(''))
      // dispatch(changeKeywordAction(''))
      dispatch(selectItemListAction(response.data))
      dispatch(push(RouteDir+'/item/list'))
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}

//一般ページサイドバーのカテゴリー選択
export const changeCategory = (Id) =>
{
  return async (dispatch) =>
  {
    // dispatch(changeKeywordAction(''))
    // dispatch(changeCategoryAction(Id))
    dispatch(push(RouteDir + '/item/list?category=' + Id))
  }
}

//一般ページサイドバーのキーワード検索
export const changeKeyword = (keyword) =>
{
  return async (dispatch) =>
  {
    // dispatch(changeKeywordAction(keyword))
    // dispatch(changeCategoryAction(''))
    dispatch(push(RouteDir + '/item/list?keyword=' + keyword))
  }
}








