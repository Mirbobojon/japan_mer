import React, { useCallback, useEffect, useState } from "react"
import { updateDepartment } from '../../reducks/departments/operations'
import { useDispatch} from 'react-redux'
import axios from 'axios'
import { ApiDir } from '../../common'


const ItemList = (props) =>
{
  const pageItemId = props.match.params.id
  const dispatch = useDispatch()

  //商品名の入力
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
    //担当部署情報の取得
    let params = new URLSearchParams();
    params.append('department_id',pageItemId);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectDepartment.php',params)
    .then(function(response){
      //各項目値のセット
      setNameValue(response.data[0].name)
    })
    .catch(function(error){
      console.log(error)
      return
    })
  },[dispatch, pageItemId])

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //商品IDの追加
    formData.append('department_id',pageItemId)

    //formkeyの追加
    formData.append('formkey','updatekey')
    dispatch(updateDepartment(formData))
  }

  return(
    <main id="department_edit_page">
      <h2 className="page_title"><span>担当部署編集</span></h2>
      <section className="box_type_1">
        <div className="title_area">
          <h3>担当部署情報</h3>
        </div>
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
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
          <button id = "insert_btn" onClick={()=>sendFormData()}>登録</button>
        </div>
      </section>
    </main>
  )
}

export default ItemList