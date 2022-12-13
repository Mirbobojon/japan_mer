import React, { useCallback, useEffect, useState } from "react"
import { insertAdmin } from '../../reducks/admins/operations'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { ApiDir } from '../../common'
import { isMailAddressValid, isPasswordValid } from "../../myLib"


const ItemList = (props) =>
{
  const dispatch = useDispatch()

  const [departments, setDepartments] = useState([])
  const [authorities, setAuthorities] = useState([])

  //管理者名の入力
  const [nameValue, setNameValue] = useState('')
  const inputNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setNameValue(event.target.value)
  }, [setNameValue])

  //パスワードの入力
  const [passwordValue, setPasswordValue] = useState('')
  const inputPasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setPasswordValue(event.target.value)
  }, [setPasswordValue])

  //パスワード（確認用）の入力
  const [rePasswordValue, setRePasswordValue] = useState('')
  const inputRePasswordValue = useCallback((event) =>
  {
    inputValueCheck()
    setRePasswordValue(event.target.value)
  }, [setRePasswordValue])

  //メールアドレスの入力
  const [mailAddressValue, setMailAddressValue] = useState('')
  const inputMailAddressValue = useCallback((event) =>
  {
    inputValueCheck()
    setMailAddressValue(event.target.value)
  }, [setMailAddressValue])

  //担当部署の入力
  const [departmentValue, setDepartmentValue] = useState('')
  const inputDepartmentValue = useCallback((event) =>
  {
    inputValueCheck()
    setDepartmentValue(event.target.value)
  }, [setDepartmentValue])

  //権限の入力
  const [authorityIdValue, setAuthorityIdValue] = useState(1)
  const inputAuthorityIdValue = useCallback((event) =>
  {
    inputValueCheck()
    setAuthorityIdValue(event.target.value)
  }, [setAuthorityIdValue])

  //状態の入力
  const [statusValue, setStatusValue] = useState('1')
  const inputStatusValue = useCallback((event) =>
  {
    inputValueCheck()
    setStatusValue(event.target.value)
  }, [setStatusValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfName = document.getElementsByName('name')
    const inputValueOfPassword = document.getElementsByName('password')
    const inputValueOfRePassword = document.getElementsByName('re_password')
    const inputValueOfMailAddress = document.getElementsByName('mail_address')

    if(inputValueOfName[0].value !== '' && inputValueOfPassword[0].value !== '' && inputValueOfRePassword[0].value !== '' && inputValueOfMailAddress[0].value !== '')
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
    let params = new URLSearchParams();

    //担当部署取得
    params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectDepartmentList.php',params)
    .then(function(response){
      setDepartments(response.data)
    })
    .catch(function(error){
      console.log(error)
      return
    })

    //権限取得
    params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectAuthorityList.php',params)
    .then(function(response){
      setAuthorities(response.data)
    })
    .catch(function(error){
      console.log(error)
      return
    })

  },[])

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    // メールアドレス要件を満たしているか検証
    if(!isMailAddressValid(mailAddressValue)) {
      window.alert("メールアドレスを正しく入力してください。")
      return;
    }

    // パスワード要件を満たしているか検証
    if(!isPasswordValid(passwordValue)) {
      window.alert("パスワードは10~20文字の半角英数字・記号で入力してください。")
      return;
    }
    
    // パスワードと確認用パスワードが一致するか検証
    if(passwordValue !== rePasswordValue) {
      window.alert("パスワードと確認用パスワードが一致しません。")
      return;
    }

    //form情報の取得
    const formElement = document.getElementById('add_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','insertkey')
    dispatch(insertAdmin(formData))
  }

  return(
    <main id="admin_add_page">
      <h2 className="page_title"><span>管理者新規登録</span></h2>
      <section className="box_type_1">
        <div className="title_area">
          <h3>管理者情報</h3>
        </div>
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="add_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>氏名</th>
                  <td>
                    <input
                      type = "text"
                      name = {'name'}
                      maxLength="20"
                      value = {nameValue}
                      onChange = {inputNameValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>
                    <input
                      type = "text"
                      name = "mail_address"
                      value = {mailAddressValue}
                      onChange = {inputMailAddressValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>パスワード</th>
                  <td>
                    <input
                      type = "text"
                      name = {'password'}
                      value = {passwordValue}
                      // maxLength="20"
                      onChange = {inputPasswordValue}
                    />
                    <br/>
                    <input
                      type = "text"
                      name = {'re_password'}
                      value = {rePasswordValue}
                      // maxLength="20"
                      onChange = {inputRePasswordValue}
                      placeholder = {'もう一度入力してください'}
                    />
                  </td>
                </tr>
                <tr>
                  <th>担当部署</th>
                  <td>
                    <select
                      name = {'department_id'}
                      value = {departmentValue}
                      onChange = {inputDepartmentValue}
                    >
                      {Array.isArray(departments) && departments.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>権限</th>
                  <td>
                    <select
                      name = {'authority_id'}
                      value = {authorityIdValue}
                      onChange = {inputAuthorityIdValue}
                    >
                      {Array.isArray(authorities) && authorities.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>状態</th>
                  <td>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="status"
                        value={0}
                        checked = {statusValue === '0'}
                        onChange = {inputStatusValue}
                      />無効
                    </label>
                    <label className="radio_btn_label">
                      <input
                        type="radio"
                        name="status"
                        value={1}
                        checked = {statusValue === '1'}
                        onChange = {inputStatusValue}
                      />有効
                    </label>
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

export default ItemList