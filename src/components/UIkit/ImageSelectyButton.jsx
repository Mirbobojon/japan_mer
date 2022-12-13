import React, { useEffect, useState } from 'react'

const style =
{
  display: 'none',
}

const ImageSelectyButton = (props) => {
  const [srcValue, setSrcValue] = useState('');
  const [deleteImageFlag, setDeleteImageFlag] = useState(true);

  useEffect(() => {
    setSrcValue(props.imageSrc)
  }, [props.imageSrc])

  // 画像更新用に既存IDをステートにセット
  const handleImageUpdate = (imageType, currentImageId) => {
    // 既存画像がある場合
    if (currentImageId !== "") {
      let tmpUpdateImageId = props.updateImageId
      tmpUpdateImageId[imageType] = currentImageId
      props.setUpdateImageId(tmpUpdateImageId)
    }
  }

  // handleImageUpdate("image_main", 123)

  //ボタンのひとつ前の兄弟要素のimgタグのsrcを変更（選択時のサムネイル変更）
  const ImageSelect = (e) => {
    setSrcValue('')
    const prentElement = e.target.closest('.progress_key_element');
    prentElement.classList.add('progress');
    if (e.target.files && e.target.files[0]) {
      // ファイルサイズチェック (10MB以上は受け付けない)
      // alert(e.target.files[0].size);
      if (Number(e.target.files[0].size) / 1024 / 1024 > 10) {
        alert("商品画像は10MB以下のファイルサイズのものを使用してください。");
        e.target.value = "";  /* ファイル選択解除 */
        prentElement.classList.remove('progress')
        return;
      }

      setDeleteImageFlag(true);
      //削除する画像idの格納
      // if (props.imageSrc !== '') {
      // props.setSelectImageDeleteFlag(true)
      // const fileElement = document.getElementById('file_upload_' + props.id);
      // let deleteImageIdArray = props.selectImageDeleteId;
      // if(!deleteImageIdArray.includes(fileElement.dataset.id)) {
      //   deleteImageIdArray.push(fileElement.dataset.id);
      //   props.setSelectImageDeleteId(deleteImageIdArray);
      // }
      // }

      //削除する画像idの格納
      if (props.setSelectImageDeleteFlag !== 'add') {
        const fileElement = document.getElementById('file_upload_' + props.id);
        let deleteImageIdArray = props.selectImageDeleteId;
        if (fileElement.dataset.id !== ""
          && !deleteImageIdArray.includes(fileElement.dataset.id)) {
          deleteImageIdArray.push(fileElement.dataset.id);
          props.setSelectImageDeleteId(deleteImageIdArray);
        }
      }

      // 更新用に既存画像IDを格納
      // const fileElement = document.getElementById('file_upload_' + props.id);
      // handleImageUpdate(props.id, fileElement.dataset.id)
      // console.log(props.updateImageId)

      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById(props.id).nextElementSibling.querySelector('img').setAttribute('src', e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setSrcValue(e.target.result)
    }
    prentElement.classList.remove('progress')
  }

  //画像の指定を削除
  const ImageDelete = (e, id) => {
    const fileElement = document.getElementById('file_upload_' + id);
    fileElement.value = '';

    if (props.setSelectImageDeleteFlag !== 'add') {
      props.setSelectImageDeleteFlag(true)
      //削除する画像idの格納
      let deleteImageIdArray = props.selectImageDeleteId;
      if (fileElement.dataset.id !== ""
        && !deleteImageIdArray.includes(fileElement.dataset.id)) {
        deleteImageIdArray.push(fileElement.dataset.id);
        props.setSelectImageDeleteId(deleteImageIdArray);
      }
    }
    const imgElement = document.getElementById(id + '_thumb_img');
    imgElement.setAttribute('src', '');
    setDeleteImageFlag(false);
    setSrcValue('');
  }

  return (
    <>
      <button id={props.id} variant='contained' className={props.className}>
        <label htmlFor={'file_upload_' + props.id}>
          ファイルを選択
          <input type="file" style={style} name={props.id} id={'file_upload_' + props.id} accept="image/jpeg" onChange={(event) => ImageSelect(event)} data-id={props.imageId} />
        </label>
      </button>
      {
        (srcValue === '' && props.imageSrc === '') || deleteImageFlag === false
          ? <><span className='progress_none'>画像が選択されていません。</span><span className='progress_show'>loading...</span></>
          : <div className="thumbnail_area">
            <img id={props.id + '_thumb_img'} src={srcValue} alt='' />
            <button className="image_delete" onClick={(event) => ImageDelete(event, props.id)}><span>×</span></button>
          </div>
      }
    </>
  )
}

export default ImageSelectyButton