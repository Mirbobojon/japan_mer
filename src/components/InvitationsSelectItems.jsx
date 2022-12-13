import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomeSelectItems = () =>
{
  const [items, setItems] = useState([])

  useEffect(()=>{
    getItems()
  },[])

  //検索条件のリセット
  function getItems ()
  {
    let params = new URLSearchParams();
    params.append('category', 1);
    params.append('limit', 5);

    axios.post('/pocket_ec/api/selectItemsAll.php',params)
    .then(function(response){
      setItems(response.data)
      console.log(response.data)
    })
    .catch(function(error){
      return
    })
    .finally(function(){
      return
    })
  }

  return(
    <section>
      <h2>商品一覧(招待状)</h2>
      {items.map((item, i)=>(
        <p key={i}>商品名：{item.name} / 値段：{item.price}</p>
      ))}
    </section>
  )
}

export default HomeSelectItems