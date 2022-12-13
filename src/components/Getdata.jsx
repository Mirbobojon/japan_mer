import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Getdata = () =>
{
  const [selectColor, setColor] = useState('')
  const [selectPrice, setPrice] = useState('')
  const [selectCategory, setCategory] = useState('')
  const [items, setItems] = useState([])

  useEffect(()=>{
    resetParam()
  },[])

  //色で絞り込み
  function colorChange(e)
  {
    const colorValue = e.target.value
    setColor(colorValue)

    let params = new URLSearchParams();
    params.append('color',colorValue);
    params.append('price',selectPrice);
    params.append('category',selectCategory);

    axios.post('/pocket_ec/api/getProducts.php',params)
    .then(function(response){
      setItems(response.data)
    })
    .catch(function(error){
      return
    })
    .finally(function(){
      return
    })
  }

  //値段で絞り込み
  function priceChange(e)
  {
    const priceValue = e.target.value
    setPrice(priceValue)

    let params = new URLSearchParams();
    params.append('color',selectColor);
    params.append('price',priceValue);
    params.append('category',selectCategory);

    axios.post('/pocket_ec/api/getProducts.php',params)
    .then(function(response){
      setItems(response.data)
    })
    .catch(function(error){
      return
    })
    .finally(function(){
      return
    })
  }

  //カテゴリーで絞り込み
  function categoryChange(e)
  {
    const categoryValue = e.target.value
    setCategory(categoryValue)

    let params = new URLSearchParams();
    params.append('color',selectColor);
    params.append('price',selectPrice);
    params.append('category',categoryValue);

    axios.post('/pocket_ec/api/getProducts.php',params)
    .then(function(response){
      setItems(response.data)
    })
    .catch(function(error){
      return
    })
    .finally(function(){
      return
    })
  }

  //検索条件のリセット
  function resetParam ()
  {
    setColor('')
    setPrice('')
    setCategory('')

    let params = new URLSearchParams();
    params.append('color','');
    params.append('price','');
    params.append('category','');

    axios.post('/pocket_ec/api/getProducts.php',params)
    .then(function(response){
      setItems(response.data)
      const radioElement = document.querySelectorAll("input[type=radio]")
      for (let i=0; i<radioElement.length; i++) {
        radioElement[i].checked = false;
      }
    })
    .catch(function(error){
      return
    })
    .finally(function(){
      return
    })
  }

  return(
    <div>
      <h2>商品一覧</h2>
      <p>選択した色：{selectColor}</p>
      <p>選択した値段：{selectPrice}</p>
      <p>選択したカテゴリー：{selectCategory}</p>
      <p>
        <label><input type="radio" name="color" value="red" onChange={colorChange}/>赤</label>
        <label><input type="radio" name="color" value="blue" onChange={colorChange}/>青</label>
        <label><input type="radio" name="color" value="yellow" onChange={colorChange}/>黄色</label>
      </p>
      <p>
        <label><input type="radio" name="price" value="100" onChange={priceChange}/>100</label>
        <label><input type="radio" name="price" value="110" onChange={priceChange}/>110</label>
        <label><input type="radio" name="price" value="130" onChange={priceChange}/>130</label>
      </p>
      <p>
        <label><input type="radio" name="category" value="1" onChange={categoryChange}/>招待状</label>
        <label><input type="radio" name="category" value="2" onChange={categoryChange}/>席次表</label>
        <label><input type="radio" name="category" value="3" onChange={categoryChange}/>席札</label>
      </p>
      <button onClick={resetParam}>条件をリセット</button>
      {items.map((item, i)=>(
        <p key={i}>商品名：{item.name} / 値段：{item.price}</p>
      ))}
    </div>
  )
}

export default Getdata
