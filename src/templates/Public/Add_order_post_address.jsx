import React, { useState, useEffect } from "react"
import DocumentMeta from 'react-document-meta'
import { formSendConfirm } from '../../reducks/orders/operations'
import { useDispatch, useSelector } from 'react-redux'
import { BreadCrumb, OrderFlow, AddPostAddressForm } from '../../components'
import { SiteTitle } from './common'
import axios from 'axios'
import { ApiDir, REGEX_TEL_NUMBER, RouteDir } from '../../common'
import { push } from "connected-react-router"

const CartList = () =>
{
  const dispatch = useDispatch()

  const postAddress = useSelector(state => state.orders.postAddress[0])

  const [familyName, setFamilyName] = useState(postAddress.family_name)
  const [firstName, setFirstName] = useState(postAddress.first_name)
  const [familyNameFurigana, setFamilyNameFurigana] = useState(postAddress.family_name_furigana)
  const [firstNameFurigana, setFirstNameFurigana] = useState(postAddress.first_name_furigana)
  const [postalCode, setpostalCode] = useState(postAddress.postal_code)
  const [address, setAddress] = useState(postAddress.address)
  const [address1, setAddress1] = useState(postAddress.address_1)
  const [address2, setAddress2] = useState(postAddress.address_2)
  const [telnumber, setTelnumber] = useState(postAddress.telnumber)
  const [isAddressSeparated, setIsAddressSeparated] = useState(postAddress.isAddressSeparated)

  useEffect(()=>{
    // 画面を一番上に移動させたいができていない
    // window.scrollTo(0, 0);
    // document.getElementById("root").scroll(0, 0)
    
    // 住所確定後に「お届け先情報の追加」画面に戻った場合に再度入力チェック
    // 画面遷移直後ではinputタグに値がセットされていないようなので、少し遅らせて実行
    setTimeout(()=>{
      inputValueCheck()
    }, 500);
  },[])

  const insertMyhouseAddress = () =>
  {
    //自宅情報の取得
    let params = new URLSearchParams()
    params.append('formkey','selectkey')
    axios.post(ApiDir+'/selectMyMemberInfo.php',params)
    .then(function(response){
      setFamilyName(response.data[0].family_name)
      setFirstName(response.data[0].first_name)
      setFamilyNameFurigana(response.data[0].family_name_furigana)
      setFirstNameFurigana(response.data[0].first_name_furigana)
      setpostalCode(response.data[0].postal_code)
      setAddress(response.data[0].address)
      setTelnumber(response.data[0].telnumber)
      setIsAddressSeparated(false);
      inputValueCheck()
    })
    .catch(function(error){
      console.log(error)
      return
    })
  }

  // 住所を手動で入力する
  const inputAddressManually = () => {
    setpostalCode("");
    setAddress("");
    setAddress1("");
    setAddress2("");
    setIsAddressSeparated(true);
  }

  //入力値が入っているかの確認
  const inputValueCheck = () => {
    const formElem = document.getElementById('insert_form');
    for(let i=0; i < formElem.elements.length; i++) {
      const elem = formElem.elements[i];
      if(elem.tagName === "INPUT") {  /* inputタグのみチェック */
        if(formElem.elements[i].hasAttribute("required")) {
          if(formElem.elements[i].value.trim() == "") {
            document.getElementById('confirm_btn').classList.add('disabled')
            return;
          }
        }
      }
    }
    document.getElementById('confirm_btn').classList.remove('disabled')
  }
  
  const sendConfirmBtn = ()=>
  {
    const telNumberValue = document.getElementsByName("telnumber")[0].value
    if(telNumberValue !== "") {
      if(!REGEX_TEL_NUMBER.test(telNumberValue)) {
        window.alert("電話番号を正しく入力してください。")
        return
      }
    }

    const formElement = document.getElementById('insert_form')
    const formData = new FormData(formElement)
    dispatch(formSendConfirm(formData, isAddressSeparated))
  }

  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: '買い物カゴ',
      href: '/mypage/cart_list'
    }
  ]

  return(
    <DocumentMeta {...meta}>
      <div id="add_order_post_address_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="add_order_post_address_content">
          <h1>お届け先情報の追加</h1>
          <OrderFlow
            activeKey = {1}
          />
          <p className="introduction">
            「ご自宅の住所を入力する」を押すと登録されているご自宅の情報が入力できます。<br/>
            「お届けリストより入力する」を押すと登録した「お届けリスト」からお届け先を選択できます。<br/>
            会員情報に住所の登録がお済でない方、ご自宅以外にお届けされたい方は、下の入力欄に必要項目をご入力ください。
          </p>
          <div className="add_address_btn_area">
            <button onClick={()=>insertMyhouseAddress()}>ご自宅の住所を入力する</button>
            <button onClick={()=>dispatch(push(RouteDir+'/mypage/post_address_list'))}>お届けリストより入力する</button>
            {/* <button onClick={()=>inputAddressManually()}>住所を手動で入力する</button> */}
          </div>
          <p className="introduction">お届け先の情報をご入力ください。</p>
          <section className="form_type_1">
            <AddPostAddressForm
              familyName = {familyName}
              firstName = {firstName}
              familyNameFurigana = {familyNameFurigana}
              firstNameFurigana = {firstNameFurigana}
              postalCode = {postalCode}
              address = {address}
              address1 = {address1}
              address2 = {address2}
              telnumber = {telnumber}
              inputValueCheck = {inputValueCheck}
              isAddressSeparated = {isAddressSeparated}
              inputAddressManually={inputAddressManually}
            />
          </section>
          <div className="btn_area">
            <button className="order_post_info_link_btn" onClick={()=>dispatch(push(RouteDir+'/mypage/cart_list'))}>買い物カゴに戻る</button>
            <button id="confirm_btn" className='add_btn disabled' onClick={()=>sendConfirmBtn()}>決定</button>
          </div>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default CartList