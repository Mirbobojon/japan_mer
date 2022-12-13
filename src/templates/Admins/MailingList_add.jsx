import React, { useCallback, useState } from "react"
import { insertMailingList } from '../../reducks/mailingListMembers/operations'
import { useDispatch} from 'react-redux'


const ItemList = (props) =>
{
  const dispatch = useDispatch()

  //タイトルの入力
  const [titleValue, setTitleValue] = useState('')
  const inputTitleValue = useCallback((event) =>
  {
    setTitleValue(event.target.value)
    inputValueCheck()
  }, [setTitleValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfTitle = document.getElementsByName('title')

    if(inputValueOfTitle[0].value !== '')
    {
      document.getElementById('insert_btn').classList.remove('desabled')
    }
    else
    {
      document.getElementById('insert_btn').classList.add('desabled')
    }
  }

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    //form情報の取得
    const formElement = document.getElementById('add_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','insertkey')
    dispatch(insertMailingList(formData))
  }

  return(
    <main id="mailing_list_add_page">
      <h2 className="page_title"><span>メーリングリスト新規登録</span></h2>
      <section className="box_type_2">
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="add_form" onSubmit={(e)=>e.preventDefault()}>
            <dl>
              <dt>タイトル</dt>
              <dd>
                <input
                  type = "text"
                  name = {'title'}
                  maxLength="255"
                  value = {titleValue}
                  onChange = {inputTitleValue}
                />
              </dd>
            </dl>
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