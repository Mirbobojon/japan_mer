import React, { useCallback, useEffect, useState } from "react"
import { insertDepartment } from '../../reducks/departments/operations'
import { useDispatch } from 'react-redux'


const DepartmentAdd = (props) =>
{
  const dispatch = useDispatch()

  //担当部署名の入力
  const [nameValue, setNameValue] = useState('')
  const inputNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setNameValue(event.target.value)
  }, [setNameValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfName = document.getElementsByName('name')

    if(inputValueOfName[0].value !== '')
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


  },[])

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    //form情報の取得
    const formElement = document.getElementById('add_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','insertkey')
    dispatch(insertDepartment(formData))
  }

  return(
    <main id="department_add_page">
      <h2 className="page_title"><span>担当部署新規登録</span></h2>
      <section className="box_type_1">
        <div className="title_area">
          <h3>担当部署情報</h3>
        </div>
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="add_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>担当部署名</th>
                  <td>
                    <input
                      type = "text"
                      name = {'name'}
                      maxLength="50"
                      value = {nameValue}
                      onChange = {inputNameValue}
                    />
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

export default DepartmentAdd