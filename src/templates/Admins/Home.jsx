import React, { useEffect, useState } from "react"
import axios from 'axios'
import { ApiDir } from '../../common'


const Home = () =>
{
  const [orderCount, setOrderCount] = useState('');
  const [paidOrderCount, setPaidOrderCount] = useState('');
  const [sendOrderCount, setSendOrderCount] = useState('');
  const [itemCount, setItemCount] = useState('');
  const [OOSitemCount, setOOSitemCount] = useState('');
  const [memberCount, setMemberCount] = useState('');

  useEffect(()=>
  {
    let params = new URLSearchParams();

    //「受注」数の取得
    params.append('status', 2);
    params.append('formkey', 'selectkey');
    axios.post(ApiDir+'/selectOrdersCount.php',params)
    .then(function(response){
      setOrderCount(response.data[0]['count(id)']);
      console.log(response)
    })
    .catch(function(error){
      console.log(error);
      return;
    })

    //「入金済み」数の取得
    params = new URLSearchParams();
    params.append('status', 3);
    params.append('formkey', 'selectkey');
    axios.post(ApiDir+'/selectOrdersCount.php',params)
    .then(function(response){
      setPaidOrderCount(response.data[0]['count(id)']);
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error);
      return;
    })

    //「発注済み」数の取得
    params = new URLSearchParams();
    params.append('status', 4);
    params.append('formkey', 'selectkey');
    axios.post(ApiDir+'/selectOrdersCount.php',params)
    .then(function(response){
      setSendOrderCount(response.data[0]['count(id)']);
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error);
      return;
    })

    //「取扱商品数」の取得
    params = new URLSearchParams();
    params.append('formkey', 'selectkey');
    axios.post(ApiDir+'/selectItemsCount.php',params)
    .then(function(response){
      setItemCount(response.data[0]['count(id)']);
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error);
      return;
    })

    //「在庫切れ商品数」の取得
    params = new URLSearchParams();
    params.append('formkey', 'selectkey');
    axios.post(ApiDir+'/selectNostocksCount.php',params)
    .then(function(response){
      setOOSitemCount(response.data[0]['count(id)']);
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error);
      return;
    })

    //「会員数」の取得
    params = new URLSearchParams();
    params.append('formkey', 'selectkey');
    axios.post(ApiDir+'/selectMembersCount.php',params)
    .then(function(response){
      setMemberCount(response.data[0]['count(id)']);
      console.log(response.data)
    })
    .catch(function(error){
      console.log(error);
      return;
    })

  },[])
  return(
    <main id="home_page">
      <h2 className="page_title"><span>ホーム</span></h2>
      <section className="order_situation_area situation_area">
        <ul>
          <li><span className="title">受注</span><span className="value">{orderCount}</span></li>
          <li><span className="title">入金済み</span><span className="value">{paidOrderCount}</span></li>
          <li><span className="title">発注済み</span><span className="value">{sendOrderCount}</span></li>
        </ul>
      </section>
      <section className="shop_situation situation_area">
        <ul>
          <li><span className="title">取扱商品数</span><span className="value">{itemCount}</span></li>
          <li><span className="title">在庫切れ商品数</span><span className="value">{OOSitemCount}</span></li>
          <li><span className="title">会員数</span><span className="value">{memberCount}</span></li>
        </ul>
      </section>
    </main>
  )
}

export default Home