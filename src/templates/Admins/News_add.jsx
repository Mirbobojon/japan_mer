import React, { useCallback, useState } from "react"
import { insertNews } from '../../reducks/news/operations'
import  {ImageSelectyButton } from '../../components/UIkit'
import { useDispatch } from 'react-redux'
import { ApiDir } from '../../common'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ja.js'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ja from 'date-fns/locale/ja'
registerLocale('ja', ja)


const NewsList = (props) =>
{
  const dispatch = useDispatch()

  //エディタ用
  const [editor, setEditor] = useState('')
  const [imagesSrc, setImagesSrc] = useState([])

  //タイトルの入力
  const [titleValue, setTitleValue] = useState('')
  const inputTitleValue = useCallback((event) =>
  {
    inputValueCheck()
    setTitleValue(event.target.value)
  }, [setTitleValue])

    //状態の入力
    const [statusValue, setStatusValue] = useState('draft')
    const inputStatusValue = useCallback((event) =>
    {
      inputValueCheck()
      setStatusValue(event.target.value)
    }, [setStatusValue])

  //公開日の入力
  const initialDate = new Date()
  const [publicationDateValue, setPublicationDateValue] = useState(initialDate)
  const inputPublicationDateValue = (date) => {
    inputValueCheck()
    setPublicationDateValue(date)
  }

  //公開時の入力
  const hour = initialDate.getHours()
  const [publicationHourValue, setPublicationHourValue] = useState(hour)
  const inputPublicationHourValue = useCallback((event) =>
  {
    inputValueCheck()
    setPublicationHourValue(event.target.value)
  }, [setPublicationHourValue])

  //公開分の入力
  const minutes = initialDate.getMinutes()
  let minutesValue = 0
  if(15 <= minutes && minutes < 30)
  {
    minutesValue = 15
  }
  else if(30 <= minutes && minutes < 45)
  {
    minutesValue = 30
  }
  else
  {
    minutesValue = 45
  }
  const [publicationMinutesValue, setPublicationMinutesValue] = useState(minutesValue)
  const inputPublicationMinutesValue = useCallback((event) =>
  {
    inputValueCheck()
    setPublicationMinutesValue(event.target.value)
  }, [setPublicationMinutesValue])


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
    formData.append('body',editor)
    formData.append('imagesSrc',imagesSrc)
    dispatch(insertNews(formData))
  }

  //エディタの画像処理
  const getContentImageSrc = (data) =>
  {
    const content = data
    let invisibleDiv = document.createElement('div');
    invisibleDiv.style.display = 'none';
    invisibleDiv.innerHTML = content;
    const imageElements = invisibleDiv.getElementsByTagName('img')
    const imagesSrcArray = []
    for(let i = 0; i < imageElements.length; i++)
    {
      if(imageElements[i] && imageElements[i].getAttribute('src') !== null && imageElements[i].getAttribute('src').includes('/') !== false){
        //最後のスラッシュ以降の文字列を切り取り
        const targetIndex = (imageElements[i].getAttribute('src')).lastIndexOf('/')
        const SRC = (imageElements[i].getAttribute('src')).substring(targetIndex)
        imagesSrcArray.push(SRC)
      }
    }
    setImagesSrc(imagesSrcArray)
  }

  const statusItem =
  [
    {id:1, name:'下書き', value:'draft'},
    {id:2, name:'公開', value:'public'},
    {id:3, name:'非公開', value:'private'},
  ]

  const hourItem =
  [
    {id:0, name:0, value:0},
    {id:1, name:1, value:1},
    {id:2, name:2, value:2},
    {id:3, name:3, value:3},
    {id:4, name:4, value:4},
    {id:5, name:5, value:5},
    {id:6, name:6, value:6},
    {id:7, name:7, value:7},
    {id:8, name:8, value:8},
    {id:9, name:9, value:9},
    {id:10, name:10, value:10},
    {id:11, name:11, value:11},
    {id:12, name:12, value:12},
    {id:13, name:13, value:13},
    {id:14, name:14, value:14},
    {id:15, name:15, value:15},
    {id:16, name:16, value:16},
    {id:17, name:17, value:17},
    {id:18, name:18, value:18},
    {id:19, name:19, value:19},
    {id:20, name:20, value:20},
    {id:21, name:21, value:21},
    {id:22, name:22, value:22},
    {id:23, name:23, value:23}
  ]
  const minutesItem =
  [
    {id:0, name:0, value:0},
    {id:15, name:15, value:15},
    {id:30, name:30, value:30},
    {id:45, name:45, value:45},
  ]


  return(
    <main id="news_add_page">
      <h2 className="page_title"><span>お知らせ新規登録</span></h2>
      <section className="box_type_2">
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="add_form" onSubmit={(e)=>e.preventDefault()}>
            <dl>
              <dt>タイトル</dt>
              <dd>
                <input
                  type = "text"
                  name = {'title'}
                  value = {titleValue}
                  onChange = {inputTitleValue}
                />
              </dd>
            </dl>
            <dl>
              <dt>本文</dt>
              <dd>
              <CKEditor
                  config = {{
                    items: [
                      'heading', '|',
                      'fontfamily', 'fontsize', '|',
                      'alignment', '|',
                      'fontColor', 'fontBackgroundColor', '|',
                      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                      'link', '|',
                      'outdent', 'indent', '|',
                      'bulletedList', 'numberedList', 'todoList', '|',
                      'code', 'codeBlock', '|',
                      'insertTable', '|',
                      'uploadImage', 'blockQuote', '|',
                      'undo', 'redo'
                    ],
                    shouldNotGroupWhenFull: true,
                    language: 'ja',
                    ckfinder: {
                      uploadUrl: ApiDir + '/newsBodyImageUpload.php'
                    }
                  }}
                  editor={ ClassicEditor }
                  data=""
                  onReady={ editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log( 'Editor is ready to use!', editor );
                  } }
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      setEditor(data);
                      getContentImageSrc(data)
                  } }
                  onBlur={ ( event, editor ) => {
                      console.log( 'Blur.', editor );
                  } }
                  onFocus={ ( event, editor ) => {
                      console.log( 'Focus.', editor );
                  } }
                />
              </dd>
            </dl>
            <dl>
              <dt>アイキャッチ画像</dt>
              <dd className="progress_key_element">
                <ImageSelectyButton
                  id={'main_image'}
                  className={'file_btn'}
                  imageSrc={''}
                  setSelectImageDeleteFlag = {'add'}
                />
              </dd>
            </dl>
            <dl>
              <dt>状態</dt>
              <dd>
                {Array.isArray(statusItem) && statusItem.map((state) => (
                  <label key={state.id} className="radio_btn_label">
                    <input
                      name="status"
                      type="radio"
                      value={state.value}
                      checked = {statusValue === state.value}
                      onChange = {inputStatusValue}
                    />{state.name}
                  </label>
                ))}
              </dd>
            </dl>
            <dl>
              <dt>公開日時</dt>
              <dd>
                <DatePicker
                  name={'publication_date'}
                  selected={ publicationDateValue }
                  onChange = {inputPublicationDateValue}
                  dateFormat="yyyy-MM-dd"
                  locale="ja"
                />
                <select
                  name = {'publication_hour'}
                  value = {publicationHourValue}
                  onChange = {inputPublicationHourValue}
                >
                  {Array.isArray(hourItem) && hourItem.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
                ：
                <select
                  name = {'publication_minutes'}
                  value = {publicationMinutesValue}
                  onChange = {inputPublicationMinutesValue}
                >
                  {Array.isArray(minutesItem) && minutesItem.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
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

export default NewsList