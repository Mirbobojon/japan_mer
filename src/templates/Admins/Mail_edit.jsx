import React, { useCallback, useEffect, useState } from "react"
import { push } from 'connected-react-router'
import { selectMail, selectMailRecipients, updateMail, deleteMailingList, changeNewAddFlagState, changeDestinationTypeState, changeTitleState, changeBodyState } from '../../reducks/mails/operations'
import { changeLoading } from '../../reducks/pageInfos/operations'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AdminsDir, ApiDir } from '../../common'


const CategoryAdd = (props) =>
{
  const dispatch = useDispatch()

  //ローディング
  const loading = useSelector(state => state.pageInfos.loading)

  const pageItemId = props.match.params.id

  const newAddFlagState = useSelector(state => state.mails.newAddFlag)
  const destinationTypeState = useSelector(state => state.mails.destinationType)
  const titleState = useSelector(state => state.mails.title)
  const bodyState = useSelector(state => state.mails.body)
  const mailingLists = useSelector(state => state.mails.mailingList)

  //送信先名の入力
  const [destinationTypeValue, setDestinationTypeValue] = useState(destinationTypeState)
  const inputDestinationTypeValue = useCallback((event) =>
  {
    inputValueCheckSave()
    inputValueCheckSend()
    dispatch(changeDestinationTypeState(event.target.value))
    setDestinationTypeValue(event.target.value)
    dispatch(changeNewAddFlagState(true))
  }, [dispatch, setDestinationTypeValue])

  //タイトルの入力
  const [titleValue, setTitleValue] = useState(titleState)
  const inputTitleValue = useCallback((event) =>
  {
    inputValueCheckSave()
    inputValueCheckSend()
    dispatch(changeTitleState(event.target.value))
    setTitleValue(event.target.value)
    dispatch(changeNewAddFlagState(true))
  }, [dispatch, setTitleValue])

  //本文の入力
  const [bodyValue, setBodyValue] = useState(bodyState)
  const inputBodyValue = useCallback((event) =>
  {
    inputValueCheckSave()
    inputValueCheckSend()
    setBodyValue(event.target.value)
    dispatch(changeBodyState(event.target.value))
    dispatch(changeNewAddFlagState(true))
  }, [dispatch, setBodyValue])


  //入力値が入っているかの確認して保存ボタンを有効にする処理
  const inputValueCheckSave = () =>
  {
    const inputValueOfTitle = document.getElementsByName('title')

    if(inputValueOfTitle[0].value !== '')
    {
      document.getElementById('save_btn').classList.remove('desabled')
    }
    else
    {
      document.getElementById('save_btn').classList.add('desabled')
    }
  }

  //入力値が入っているかの確認して送信ボタンを有効にする処理
  const inputValueCheckSend = () =>
  {
    const inputValueOfTitle = document.getElementsByName('title')
    const inputValueOfBody = document.getElementsByName('body')

    if(inputValueOfTitle[0].value !== '' && inputValueOfBody[0].value !== '')
    {
      document.getElementById('send_btn').classList.remove('desabled')
    }
    else
    {
      document.getElementById('send_btn').classList.add('desabled')
    }
  }

  useEffect(()=>
  {
    if(!newAddFlagState)
    {
      let params = new URLSearchParams()
      params.append('mail_id',pageItemId)
      params.append('formkey','selectkey')
      axios.post(ApiDir + '/selectMail.php',params)
      .then(function(response){
        if(response)
        {
          setDestinationTypeValue(response.data[0].destination_type)
          setTitleValue(response.data[0].title)
          setBodyValue(response.data[0].body)
        }
        else
        {
          console.log(response.data)
          return
        }
      })
      .catch(function(error){
        console.log(error)
        return
      })
      dispatch(selectMail(pageItemId))
      dispatch(selectMailRecipients(pageItemId))
    }
    inputValueCheckSave()
    inputValueCheckSend()
  },[newAddFlagState, pageItemId, dispatch, titleValue, bodyValue])

  const deleteConfirm = (Id) =>
  {
    let mailingListArray = mailingLists
    let newMailingListArray = mailingListArray.filter((item) => item.id !== Id)
    dispatch(deleteMailingList(newMailingListArray))
    dispatch(changeNewAddFlagState(true))
  }

  //保存・送信ボタン押下時の処理
  const sendFormData = (sendType) =>
  {
    if(destinationTypeValue === "3" && mailingLists.length === 0) {
      window.alert("メーリングリストを選択してください。")
      return
    }

    //ローディング開始
    dispatch(changeLoading(true))

    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //formkeyの追加
    formData.append('formkey','updatekey')
    formData.append('mail_id',pageItemId)
    formData.append('send_type',sendType)
    formData.append('mail_recipients',JSON.stringify(mailingLists))
    dispatch(updateMail(formData))
  }

  const destinationTypeItem =
  [
    {id:1, name:'希望者一斉送信', value:'1'},
    {id:2, name:'会員一斉送信', value:'2'},
    {id:3, name:'メーリングリストより送信', value:'3'},
  ]

  return(
    <>
    <main id="mail_add_page">
      <h2 className="page_title"><span>メールマガジン編集</span></h2>
      <section className="box_type_2">
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
            <dl>
              <dt>宛先（送信方法）の選択</dt>
              <dd>
                {Array.isArray(destinationTypeItem) && destinationTypeItem.map((destinationType) => (
                  <label key={destinationType.id} className="radio_btn_label">
                    <input
                      name="destination_type"
                      type="radio"
                      value={destinationType.value}
                      checked = {destinationTypeValue === destinationType.value}
                      onChange = {inputDestinationTypeValue}
                    />{destinationType.name}
                  </label>
                ))}
                <button className="add_btn" onClick={()=>dispatch(push(AdminsDir+'/mailing_list_add/list/'+pageItemId))}>リストから選択</button>
              </dd>
              <dd>
                <div className="mailing_list_area">
                    <table>
                      <thead></thead>
                      <tbody>
                      {Array.isArray(mailingLists) && mailingLists.map((mailingList, i) =>(
                        <tr key={i}>
                          <th>{mailingList.title}</th>
                          <td>
                          <button className="delete_btn" onClick={()=>deleteConfirm(mailingList.id)}>削除</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </dd>
            </dl>
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
            <dl>
              <dt>本文</dt>
              <dd>
                <textarea
                  name="body"
                  rows="20"
                  value = {bodyValue}
                  onChange = {inputBodyValue}
                ></textarea>
              </dd>
            </dl>
          </form>
        </div>
        <div className="button_area">
          <button id = "save_btn" className="desabled" onClick={()=>sendFormData('save')}>保存</button>
          <button id = "send_btn" className="desabled" onClick={()=>sendFormData('send')}>送信</button>
        </div>
      </section>
    </main>
    <div id="loading_area" className={loading===true?'':'hidden'}>
      <div className="loader">Loading...</div>
    </div>
    </>
  )
}

export default CategoryAdd