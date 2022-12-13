import {
  selectOrderListAction,
  InsertPayTypeAction,
  InsertPostAddressAction,
  selectOrderHistoryListAction,
  selectAllOrderListAction,
  selectOrderAction
} from './actions'

import {
  changeLoadingAction,
} from '../pageInfos/actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir, RouteDir, ADDITIONAL_SHIPPING_FEE } from '../../common'
import isolatedIslands from '../../isolated_islands.json'

//買い物カゴお届け先リスト取得
export const selectOrderPostAddressList = () =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('status',1)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectOrderPostAddressList.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        //state情報の変更
        dispatch(selectOrderListAction(response.data))
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

//買い物カゴお届け先先情報挿入
export const insertOrderPostAddress = (formData) =>
  {
  return async (dispatch) =>
  {
    formData.append('formkey','insertkey')
    axios.post(ApiDir + '/insertOrderPostAddress.php',formData)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        console.log(response.data)
        //store情報の変更
        dispatch(selectOrderListAction(response.data))
        dispatch(push(RouteDir+'/mypage/order_post_info'))
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

//お届け先リストから、買い物かごお届け先挿入
export const bulkOperationInsertPostAddressFromDeliveryAddress = (selectCheckboxValue) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('select_checkbox_value',JSON.stringify(selectCheckboxValue))
    params.append('formkey','bulk_operationkey')
    axios.post(ApiDir + '/bulkOperationPostAddressFromDeliveryAddress.php',params)
    .then(function(response){
      if(response)
      {
        dispatch(push(RouteDir+'/mypage/order_post_info'))
      }
      else
      {
        window.alert('操作に失敗しました。');
      }
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }
}


//お届け先入力から確認画面に移動
export const formSendConfirm = (formData, isAddressSeparated) => {
  return async (dispatch) =>
  {
    // 離島配送料を確認
    // let params = new URLSearchParams()
    // params.append('address_1', formData.get("address_1"));
    // params.append('formkey','selectkey')

    // axios.post(ApiDir + '/selectAdditionalShippingFee.php', params)
    // .then(function(response){
    //   let additional_shipping_fee = 0;
    //   if(response.data.length === 1) {
    //     // 離島配送料を設定
    //     console.log(response.data[0].additional_shipping_fee);
    //     additional_shipping_fee = response.data[0].additional_shipping_fee
    //   }

    // 離島配送料を確認
    let additionalShippingFee = 0;
    for(let i=0; i < isolatedIslands.length; i++) {
      if(formData.get("postal_code") === isolatedIslands[i].postalCode) {
        console.log("離島配送料", isolatedIslands[i]);
        additionalShippingFee = ADDITIONAL_SHIPPING_FEE;
        break;
      }
    }

    const value = [{
      'family_name' : formData.get('family_name'),
      'first_name' : formData.get('first_name'),
      'family_name_furigana' : formData.get('family_name_furigana'),
      'first_name_furigana' : formData.get('first_name_furigana'),
      'postal_code' : formData.get('postal_code'),
      'address' : formData.get('address'),
      'address_1' : formData.get('address_1'),
      'address_2' : formData.get('address_2'),
      'telnumber' : formData.get('telnumber'),
      'additionalShippingFee' : additionalShippingFee,
      'isAddressSeparated' : isAddressSeparated,
    }]
    // console.log(value);
    // console.log(...formData.entries());
    dispatch(InsertPostAddressAction(value))
    dispatch(push(RouteDir+'/mypage/order_confirm'))

    // })
    // .catch(function(error){
    //   console.log(error)
    //   return
    // })
    // .finally(function(){
    //   return
    // })
  }
}

//お届け先リストから確認画面に移動
export const sendConfirm = (postAddressId) =>
  {
  return async (dispatch) =>
  {
    //お届け先情報を取得
    let params = new URLSearchParams()
    params.append('id', postAddressId)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectDeliveryAddress.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        console.log(response.data)

        // 離島配送料を確認
        let additionalShippingFee = 0;
        for(let i=0; i < isolatedIslands.length; i++) {
          if(response.data[0].postal_code === isolatedIslands[i].postalCode) {
            console.log("離島配送料", isolatedIslands[i]);
            additionalShippingFee = ADDITIONAL_SHIPPING_FEE;
            break;
          }
        }
        const value = [{
          ...response.data[0],
          'additionalShippingFee' : additionalShippingFee,
          'isAddressSeparated' : false,
        }]
        console.log(value);
        //store情報の変更
        dispatch(InsertPostAddressAction(value))
        // dispatch(push(RouteDir+'/mypage/add_order_post_address'))
        dispatch(push(RouteDir+'/mypage/order_confirm'))
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


//買い物カゴお届け先削除
export const deleteOrderPostAddress = (postAddressId) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('id',postAddressId)
    params.append('formkey','deletekey')
    axios.post(ApiDir + '/deleteOrderPostAddress.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        console.log(response.data)
        //store情報の変更
        dispatch(selectOrderPostAddressList())
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
export const InsertOrderPostInfo = (orders) =>
{
  return async (dispatch) =>
  {
    dispatch(selectOrderListAction(orders))
  }
}

//支払い方法をstoreに追加
export const InsertPayType = (Id, Name) =>
{
  return async (dispatch) =>
  {
    const payType = {id:Id, name:Name}
    dispatch(InsertPayTypeAction(payType))
  }
}

//買い物かごから商品数量や支払い方法を選択して、DBに情報を挿入
export const insertOrderTemp = (orders, payType, totalPrice, paymentId) =>
  {
  return async (dispatch) =>
  {
    console.log(paymentId)
    let params = new URLSearchParams()
    params.append('orders',JSON.stringify(orders))
    params.append('pay_type',JSON.stringify(payType))
    params.append('total_price',JSON.stringify(totalPrice))
    params.append('trading_id',paymentId)
    params.append('formkey','insertkey')
    axios.post(ApiDir + '/insertOrderTemp.php',params)
    .then(function(response){
      console.log(response.data)
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        if(response.data===true)
        {
          return
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


//購入履歴を取得
export const selectOrderHistoryList = () =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectOrderHistoryList.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        console.log(response.data)
        dispatch(selectOrderHistoryListAction(response.data))
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


//受注・配送一覧を取得※管理者
export const selectAllOrderList = (props) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('name',props.Name)
    params.append('limit',props.Limit)
    params.append('offset',props.Offset)
    params.append('sort',props.Sort)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectAllOrderList.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/admin/login'))
      }
      else
      {
        dispatch(selectAllOrderListAction(response.data))
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

//注文情報を取得※管理者
export const selectOrder = (OrderId) =>
  {
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('order_id',OrderId)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectOrder.php',params)
    .then(function(response){
      console.log(response.data)
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/admin/login'))
      }
      else
      {
        dispatch(selectOrderAction(response.data[0]))
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

//注文情報を更新※管理者
export const updateOrder = (FormData) =>
  {
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateOrder.php',FormData)
    .then(function(response){
      dispatch(changeLoadingAction(false))
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/admin/login'))
      }
      else
      {
        dispatch(push(AdminsDir+'/orders/list'))
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

//決済時のハッシュ値生成
export const GenerateHash = (FormData) =>
  {
  return async (dispatch) =>
  {
    axios.post(ApiDir + '/updateOrder.php',FormData)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/admin/login'))
      }
      else
      {
        dispatch(push(AdminsDir+'/orders/list'))
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


//支払い取引IDから注文情報を取得
export const selectOrderListforTradingId = (tradingId) =>
{
  return async (dispatch) =>
  {
    let params = new URLSearchParams()
    params.append('trading_id',tradingId)
    params.append('formkey','selectkey')
    axios.post(ApiDir + '/selectOrderListforTradingId.php',params)
    .then(function(response){
      if(response.data === 'nologin') //未ログイン時はログイン画面に遷移
      {
        dispatch(push(RouteDir+'/login'))
      }
      else
      {
        console.log(response.data)
        //state情報の変更
        dispatch(selectOrderListAction(response.data))
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