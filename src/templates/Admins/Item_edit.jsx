import React, { useCallback, useEffect, useState } from "react"
import { selectItemMainImage, selectItemImage, updateItem } from '../../reducks/items/operations'
import  {ImageSelectyButton } from '../../components/UIkit'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AdminsDir, ApiDir, ImagesDir, REGEX_ITEM_PRICE, REGEX_POSTAGE, REGEX_STOCK_QUANTITY } from '../../common'
import { changeLoading } from "../../reducks/pageInfos/operations"


const ItemList = (props) =>
{
  const pageItemId = props.match.params.id
  const dispatch = useDispatch()

  const imageSrc = useSelector(state => state.items.imageSrc)
  const imageId = useSelector(state => state.items.imageId)
  const imageSrcArray = useSelector(state => state.items.imageSrcArray)
  const imageIdArray = useSelector(state => state.items.imageIdArray)

  const loading = useSelector(state => state.pageInfos.loading)


  const [categories, setCategories] = useState([])
  const [taxes, setTaxes] = useState([])
  const [departments, setDepartments] = useState([])
  const [status, setStatus] = useState([])


  const [selectImageDeleteId, setSelectImageDeleteId] = useState([]);
  const [selectImageDeleteFlag, setSelectImageDeleteFlag] = useState(false);

  // 画像更新時に既存画像IDを格納, 更新しない場合は-1
  const [updateImageId, setUpdateImageId] = useState({
    main_image: -1,
    image_1: -1,
    image_2: -1,
    image_3: -1,
    image_4: -1,
  });

  //商品名の入力
  const [nameValue, setNameValue] = useState('')
  const inputNameValue = useCallback((event) =>
  {
    inputValueCheck()
    setNameValue(event.target.value)
  }, [setNameValue])

  //カテゴリの入力
  const [categoryValue, setCategoryValue] = useState('')
  const inputCategoryValue = useCallback((event) =>
  {
    inputValueCheck()
    setCategoryValue(event.target.value)
  }, [setCategoryValue])

  //商品番号の入力
  const [itemSerialValue, setItemSerialValue] = useState('')
  const inputItemSerialValue = useCallback((event) =>
  {
    inputValueCheck()
    setItemSerialValue(event.target.value)
  }, [setItemSerialValue])

  //規格の入力
  const [standardValue, setStandardValue] = useState('')
  const inputStandardValue = useCallback((event) =>
  {
    inputValueCheck()
    setStandardValue(event.target.value)
  }, [setStandardValue])

  //商品説明の入力
  const [descriptionValue, setDescriptionValue] = useState('')
  const inputDescriptionValue = useCallback((event) =>
  {
    inputValueCheck()
    setDescriptionValue(event.target.value)
  }, [setDescriptionValue])

  //税率の入力
  const [taxValue, setTaxValue] = useState('')
  const inputTaxValue = useCallback((event) =>
  {
    inputValueCheck()
    setTaxValue(event.target.value)
  }, [setTaxValue])

  //金額の入力
  const [priceValue, setPriceValue] = useState('')
  const inputPriceValue = useCallback((event) =>
  {
    inputValueCheck()
    setPriceValue(event.target.value)
  }, [setPriceValue])

  //送料の入力
  const [postageValue, setPostageValue] = useState('')
  const inputPostageValue = useCallback((event) =>
  {
    inputValueCheck()
    setPostageValue(event.target.value)
  }, [setPostageValue])

  //在庫数の入力
  const [stockQuantityValue, setStockQuantityValue] = useState('')
  const inputStockQuantityValue = useCallback((event) =>
  {
    inputValueCheck()
    setStockQuantityValue(event.target.value)
  }, [setStockQuantityValue])

  //担当部署の入力
  const [departmentValue, setDepartmentValue] = useState('')
  const inputDepartmentValue = useCallback((event) =>
  {
    inputValueCheck()
    setDepartmentValue(event.target.value)
  }, [setDepartmentValue])

  //状態の入力
  const [statusValue, setStatusValue] = useState('')
  const inputStatusValue = useCallback((event) =>
  {
    inputValueCheck()
    setStatusValue(event.target.value)
  }, [setStatusValue])

  //入力値が入っているかの確認
  const inputValueCheck = () =>
  {
    const inputValueOfName = document.getElementsByName('name')
    const inputValueOfItemSerial = document.getElementsByName('item_serial')
    const inputValueOfStandard = document.getElementsByName('standard')
    const inputValueOfdDescription = document.getElementsByName('description')
    const inputValueOfPrice = document.getElementsByName('price')
    const inputValueOfPostage = document.getElementsByName('postage')
    const inputValueOfstockQuantity = document.getElementsByName('stock_quantity')

    if(inputValueOfName[0].value !== '' && inputValueOfItemSerial[0].value !== '' && inputValueOfStandard[0].value !== '' && inputValueOfdDescription[0].value !== '' && inputValueOfPrice[0].value !== '' && inputValueOfPostage[0].value !== '' && inputValueOfPostage[0].value !== '' && inputValueOfstockQuantity[0].value !== '')
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
    //項目情報の取得 処理速度改善の為、PHP通信を一つにまとめた。要検証。
    params = new URLSearchParams();
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectItemEditValue.php',params)
    .then(function(response){
      setCategories(response.data.category)
      setTaxes(response.data.tax)
      setDepartments(response.data.department)
      setStatus(
        [
          {id:1, name:'下書き', value:'draft'},
          {id:2, name:'公開', value:'public'},
          {id:3, name:'非公開', value:'private'},
        ]
      )
    })
    .catch(function(error){
      console.log(error)
      return
    })

    //カテゴリー取得
    // params = new URLSearchParams();
    // params.append('formkey','selectkey');
    // axios.post(ApiDir+'/selectCategoryList.php',params)
    // .then(function(response){
    //   setCategories(response.data)
    // })
    // .catch(function(error){
    //   console.log(error)
    //   return
    // })

    //税率取得
    // params = new URLSearchParams();
    // params.append('formkey','selectkey');
    // axios.post(ApiDir+'/selectTaxList.php',params)
    // .then(function(response){
    //   setTaxes(response.data)
    // })
    // .catch(function(error){
    //   console.log(error)
    //   return
    // })

    //担当部署取得
    // params = new URLSearchParams();
    // params.append('formkey','selectkey');
    // axios.post(ApiDir+'/selectDepartmentList.php',params)
    // .then(function(response){
    //   setDepartments(response.data)
    // })
    // .catch(function(error){
    //   console.log(error)
    //   return
    // })

    //商品情報の取得
    params = new URLSearchParams();
    params.append('item_id',pageItemId);
    params.append('formkey','selectkey');
    axios.post(ApiDir+'/selectItem.php',params)
    .then(function(response){
      //各項目値のセット
      setNameValue(response.data[0].name)
      setCategoryValue(response.data[0].category_id)
      setItemSerialValue(response.data[0].item_serial)
      setStandardValue(response.data[0].standard)
      setDescriptionValue(response.data[0].description)
      setTaxValue(response.data[0].tax_id)
      setPriceValue(response.data[0].price)
      setPostageValue(response.data[0].postage)
      setStockQuantityValue(response.data[0].stock_quantity)
      setDepartmentValue(response.data[0].department_id)
      setStatusValue(response.data[0].status)

      //チェックボックスの操作
      if(response.data[0].recommend_flag && response.data[0].recommend_flag === '1')
      {
        let recommendElement = document.getElementById('recommend_flag_checkbox')
        recommendElement.checked = true
      }

    })
    .catch(function(error){
      console.log(error)
      return
    })

    //商品画像情報の取得
    dispatch(selectItemMainImage(pageItemId))   //メイン画像の取得
    dispatch(selectItemImage(pageItemId))       //商品画像の取得

  },[dispatch, pageItemId])

  //登録ボタン押下時の処理
  const sendFormData = () =>
  {
    // 入力値検証　ここから
    if(!REGEX_ITEM_PRICE.test(priceValue)) {
      window.alert("商品金額を正しく入力してください。")
      return
    }

    if(!REGEX_POSTAGE.test(postageValue)) {
      window.alert("送料を正しく入力してください。")
      return
    }

    console.log(stockQuantityValue, REGEX_STOCK_QUANTITY.test(stockQuantityValue))
    if(!REGEX_STOCK_QUANTITY.test(stockQuantityValue)) {
      window.alert("在庫数を正しく入力してください。")
      return
    }
    // 入力値検証　ここまで
    
    dispatch(changeLoading(true))

    // ボタン無効化
    document.getElementById("insert_btn").disabled = true

    // console.log('send')
    //form情報の取得
    const formElement = document.getElementById('update_form')
    const formData = new FormData(formElement);

    //商品IDの追加
    formData.append('item_id',pageItemId)

    //画像削除情報の追加
    formData.append('delete_image_flag',selectImageDeleteFlag)
    formData.append('delete_image_id',JSON.stringify(selectImageDeleteId))
    // formData.append('update_image_id', JSON.stringify(updateImageId))

    //formkeyの追加
    formData.append('formkey','updatekey')
    dispatch(updateItem(formData))

    document.getElementById("insert_btn").disabled = false

  }

  const images = [
    {id:1, name:'１'},
    {id:2, name:'２'},
    {id:3, name:'３'},
    {id:4, name:'４'}
  ]

  return(
    <main id="item_edit_page">
      <h2 className="page_title"><span>商品編集</span></h2>
      <section className="box_type_1">
        <div className="title_area">
          <h3>商品情報</h3>
        </div>
        <div className="content_area">
          <form encType="multipart/form-data" method="post" id="update_form" onSubmit={(e)=>e.preventDefault()}>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <th>商品名</th>
                  <td>
                    <input
                      type = "text"
                      name = {'name'}
                      maxLength="255"
                      value = {nameValue}
                      onChange = {inputNameValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>カテゴリ</th>
                  <td>
                    <select
                      name = {'category_id'}
                      value = {categoryValue}
                      onChange = {inputCategoryValue}
                    >
                    {Array.isArray(categories) && categories.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>おすすめ商品に表示</th>
                  <td>
                    <input
                      type = "checkbox"
                      id = "recommend_flag_checkbox"
                      name = "recommend_flag"
                      value = {1}
                    />
                  </td>
                </tr>
                <tr>
                  <th>商品番号</th>
                  <td>
                    <input
                      type = "text"
                      name = "item_serial"
                      maxLength="255"
                      value = {itemSerialValue}
                      onChange = {inputItemSerialValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>メイン画像</th>
                  <td className="progress_key_element">
                  <ImageSelectyButton
                    id={'main_image'}
                    className={'file_btn'}
                    imageSrc={imageSrc}
                    imageId = {imageId}
                    selectImageDeleteId = {selectImageDeleteId}
                    setSelectImageDeleteId = {setSelectImageDeleteId}
                    selectImageDeleteFlag = {selectImageDeleteFlag}
                    setSelectImageDeleteFlag = {setSelectImageDeleteFlag}
                    updateImageId={updateImageId}
                    setUpdateImageId={setUpdateImageId}
                  />
                  </td>
                </tr>
                {Array.isArray(images) && images.map((image, index) => (
                  <tr key={index}>
                    <th>商品画像{image.name}</th>
                    <td className="progress_key_element">
                    <ImageSelectyButton
                      id={'image_'+image.id}
                      className={'file_btn'}
                      imageSrc={imageSrcArray===''?'':imageSrcArray[index]}
                      imageId={imageIdArray[index]}
                      selectImageDeleteId = {selectImageDeleteId}
                      setSelectImageDeleteId = {setSelectImageDeleteId}
                      selectImageDeleteFlag = {selectImageDeleteFlag}
                      setSelectImageDeleteFlag = {setSelectImageDeleteFlag}
                      updateImageId={updateImageId}
                      setUpdateImageId={setUpdateImageId}
                    />
                    </td>
                  </tr>
                ))}
                <tr>
                  <th>規格</th>
                  <td>
                    <input
                      type = "text"
                      name = "standard"
                      maxLength="50"
                      value = {standardValue}
                      onChange = {inputStandardValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>商品説明</th>
                  <td>
                    <textarea
                      name = "description"
                      rows = "8"
                      value = {descriptionValue}
                      onChange = {inputDescriptionValue}
                    >
                    </textarea>
                  </td>
                </tr>
                <tr>
                  <th>税率設定</th>
                  <td>
                    {Array.isArray(taxes) && taxes.map((tax) => (
                      <label key={tax.id} className="radio_btn_label">
                        <input
                          type="radio"
                          name="tax_id"
                          value={tax.id}
                          checked = {taxValue === tax.id}
                          onChange = {inputTaxValue}
                        />{tax.tax_value}%
                      </label>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>金額</th>
                  <td className="td_flex">
                    <span className="yen_icon_area">￥</span>
                    <input
                      type = "number"
                      name = {'price'}
                      value = {priceValue}
                      onChange = {inputPriceValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>送料</th>
                  <td className="td_flex">
                    <span className="yen_icon_area">￥</span>
                    <input
                      type = "number"
                      name = {'postage'}
                      value = {postageValue}
                      onChange = {inputPostageValue}
                    />
                  </td>
                </tr>
                <tr>
                  <th>在庫数</th>
                  <td>
                    <input
                      type = "number"
                      name = {'stock_quantity'}
                      value = {stockQuantityValue}
                      onChange = {inputStockQuantityValue}
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
                  <th>状態</th>
                  <td>
                    {Array.isArray(status) && status.map((state) => (
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
      <div id="loading_area" className={loading === true ? '' : 'hidden'}>
        <div className="loader">Loading...</div>
      </div>
    </main>
  )
}

export default ItemList