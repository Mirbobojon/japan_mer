import React, { useCallback, useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { JsDir } from "../common"
import importScript from '../components/hooks/ImportScript'

const AddPostAddressForm= (props) =>
{
  // svg操作のjsの読み込み
  importScript(JsDir + '/ajaxzip3.js')

  const dispatch = useDispatch()

    //姓入力
    const [familyNameValue, setFamilyNameValue] = useState('')
    const inputFamilyNameValue = useCallback((event) =>
    {
      props.inputValueCheck()
      setFamilyNameValue(event.target.value)
    }, [setFamilyNameValue])

    //名入力
    const [firstNameValue, setFirstNameValue] = useState('')
    const inputFirstNameValue = useCallback((event) =>
    {
      props.inputValueCheck()
      setFirstNameValue(event.target.value)
    }, [setFirstNameValue])

    //セイ入力
    const [familyNameFuriganaValue, setFamilyNameFuriganaValue] = useState('')
    const inputFamilyNameFuriganaValue = useCallback((event) =>
    {
      props.inputValueCheck()
      setFamilyNameFuriganaValue(event.target.value)
    }, [setFamilyNameFuriganaValue])

    //メイ入力
    const [firstNameFuriganaValue, setFirstNameFuriganaValue] = useState('')
    const inputFirstNameFuriganaValue = useCallback((event) =>
    {
      props.inputValueCheck()
      setFirstNameFuriganaValue(event.target.value)
    }, [setFirstNameFuriganaValue])

    //郵便番号入力
    const [potalCodeValue, setPostalcodeValue] = useState('')
    const inputPostalCodeValue = useCallback((event) =>
    {
      setAddress1Value("")
      props.inputValueCheck()
      setPostalcodeValue(event.target.value)
    }, [setPostalcodeValue])

    //住所入力
    const [addressValue, setAddressValue] = useState('')
    const inputAddressValue = useCallback((event) =>
    {
      props.inputValueCheck()
      setAddressValue(event.target.value)
    }, [setAddressValue])

    //住所1入力
    const [address1Value, setAddress1Value] = useState('')
    const inputAddress1Value = useCallback((event) =>
    {
      props.inputValueCheck()
      setAddress1Value(event.target.value)
    }, [setAddress1Value])

    //住所2入力
    const [address2Value, setAddress2Value] = useState('')
    const inputAddress2Value = useCallback((event) =>
    {
      props.inputValueCheck()
      setAddress2Value(event.target.value)
    }, [setAddress2Value])

    //電話番号入力
    const [telnumberValue, setTelnumberValue] = useState('')
    const inputTelnumberValue = useCallback((event) =>
    {
      setTelnumberValue(event.target.value)
    }, [setTelnumberValue])

    useEffect(()=>{
      setFamilyNameValue(props.familyName)
      setFirstNameValue(props.firstName)
      setFamilyNameFuriganaValue(props.familyNameFurigana)
      setFirstNameFuriganaValue(props.firstNameFurigana)
      setPostalcodeValue(props.postalCode)
      setAddressValue(props.address)
      setAddress1Value(props.address1)
      setAddress2Value(props.address2)
      setTelnumberValue(props.telnumber)
    },[props])

    //住所自動入力
    const postalAutoInput = ()=>
    {
      const {AjaxZip3} = window
      const address1Element = document.getElementsByName('address_1')
      setAddress1Value("");
      AjaxZip3.zip2addr('postal_code','','address_1','address_1')
      setTimeout(()=>{
        const address1Value = address1Element[0].value
        setAddress1Value(address1Value)
        props.inputValueCheck()
    },100)
    }


  return(
    <form encType="multipart/form-data" method="post" id={'insert_form'} onSubmit={(e)=>e.preventDefault()}>
              <table>
                <thead></thead>
                <tbody>
                <tr>
                  <th>お名前<span className="required">必須</span></th>
                  <td>
                    <div className="family_name_area">
                      <span>姓</span>
                      <input
                        type = "text"
                        name = {'family_name'}
                        maxLength="20"
                        value = {familyNameValue}
                        onChange = {inputFamilyNameValue}
                        required
                      />
                      <input type="hidden" name={'myhouse_flag'} value="0" />
                    </div>
                    <div className="first_name_area">
                      <span>名</span>
                      <input
                        type = "text"
                        name = {'first_name'}
                        maxLength="20"
                        value = {firstNameValue}
                        onChange = {inputFirstNameValue}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>フリガナ<span className="required">必須</span></th>
                  <td>
                    <div className="family_name_area">
                      <span>セイ</span>
                      <input
                        type = "text"
                        name = {'family_name_furigana'}
                        maxLength="20"
                        value = {familyNameFuriganaValue}
                        onChange = {inputFamilyNameFuriganaValue}
                        required
                      />
                    </div>
                    <div className="first_name_area">
                      <span>メイ</span>
                      <input
                        type = "text"
                        name = {'first_name_furigana'}
                        maxLength="20"
                        value = {firstNameFuriganaValue}
                        onChange = {inputFirstNameFuriganaValue}
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>郵便番号<span className="required">必須</span></th>
                  <td>
                    〒
                    <input
                      type = "text"
                      name = {'postal_code'}
                      maxLength="8"
                      value = {potalCodeValue}
                      onChange = {inputPostalCodeValue}
                      className = {props.isAddressSeparated ? "" : "read_only"}
                      readOnly = {props.isAddressSeparated ? false : true}
                      required
                    />
                    {props.isAddressSeparated && 
                      <button className="postal_num_btn" onClick={()=>postalAutoInput()}>郵便番号から検索</button>
                    }
                    {!props.isAddressSeparated && 
                      <button onClick={()=>props.inputAddressManually()}>住所を手動で入力する</button>
                    }
                    
                  </td>
                </tr>
                <tr>
                  <th>住所<span className="required">必須</span></th>
                  <td>
                    {!props.isAddressSeparated &&
                      <input
                        type = "text"
                        name = {'address'}
                        value = {addressValue}
                        onChange = {inputAddress1Value}
                        readOnly
                        required
                      />
                    }
                    {props.isAddressSeparated &&
                      <>
                        <input
                          type = "text"
                          name = {'address_1'}
                          value = {address1Value}
                          onChange = {inputAddress1Value}
                          placeholder = {"「郵便番号から検索」を押してください（手動入力はできません）"}
                          readOnly
                          required
                        />
                        <input
                          type = "text"
                          name = {'address_2'}
                          maxLength="150"
                          value = {address2Value}
                          onChange = {inputAddress2Value}
                          placeholder = {"続きの住所を入力してください"}
                          required
                        />
                      </>
                    }
                  </td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>
                    <input
                      type = "text"
                      name = {'telnumber'}
                      maxLength="13"
                      placeholder="090-1234-5678"
                      value = {telnumberValue}
                      onChange = {inputTelnumberValue}
                    />
                  </td>
                </tr>
              </tbody>
              </table>
            </form>
  )
}
export default AddPostAddressForm