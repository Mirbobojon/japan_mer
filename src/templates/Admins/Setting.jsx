import React, { useCallback, useEffect, useState } from "react"
import { updateSetting } from '../../reducks/settings/operations'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ApiDir, REGEX_TAX_RATE } from '../../common'


const Setting = (props) =>
{
  const dispatch = useDispatch()

  //税率(軽減税率)の入力
  const [tax1Value, setTax1Value] = useState('')
  const inputTax1Value = useCallback((event) =>
  {
    inputValueCheck()
    setTax1Value(event.target.value)
  }, [setTax1Value])

  //税率(その他)の入力
  const [tax2Value, setTax2Value] = useState('')
  const inputTax2Value = useCallback((event) =>
  {
    inputValueCheck()
    setTax2Value(event.target.value)
  }, [setTax2Value])

  //入力値が入っているかの確認
  const inputValueCheck = (name) =>
  {
    const inputValueOfTax1 = document.getElementsByName('tax_1')
    const inputValueOfTax2 = document.getElementsByName('tax_2')

    if(inputValueOfTax1[0].value !== '' || inputValueOfTax2[0].value !== '')
    {
      document.getElementById('insert_btn').classList.remove('desabled')
    }
    else
    {
      document.getElementById('insert_btn').classList.add('desabled')
    }
  }

  useEffect(()=>
  {
    //税率情報の取得
    let params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectTaxList.php',params)
    .then(function(response){
      console.log(response.data)
      //各項目値のセット
      setTax1Value(response.data[0]['tax_value'])    //軽減税率
      setTax2Value(response.data[1]['tax_value'])    //その他
      inputValueCheck()
    })
    .catch(function(error){
      console.log(error)
      return
    })
  },[dispatch])

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    if(!REGEX_TAX_RATE.test(tax1Value) || !REGEX_TAX_RATE.test(tax2Value)){
      window.alert("税率を正しく入力してください。")
      return
    }

    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','updatekey')
    dispatch(updateSetting(formData))
  }

  return(
    <main id="setting_page">
      <h2 className="page_title"><span>各種設定</span></h2>
      <section className="tax_area box_type_1">
        <div className="title_area">
          <h3>税率設定</h3>
        </div>
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
          <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>商品税率設定<br/>（軽減税率）</th>
                  <td>
                    <input
                      type = "number"
                      className = "tax_input"
                      name = {'tax_1'}
                      max="999"
                      value = {tax1Value}
                      onChange = {inputTax1Value}
                    />％
                  </td>
                </tr>
                <tr>
                  <th>商品税率設定<br/>（その他）</th>
                  <td>
                    <input
                      type = "number"
                      className = "tax_input"
                      name = {'tax_2'}
                      max="999"
                      value = {tax2Value}
                      onChange = {inputTax2Value}
                    />％
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="button_area">
          <button id = "insert_btn" className="desabled" onClick={()=>sendFormData()}>登録</button>
        </div>
      </section>
    </main>
  )
}

export default Setting