import React, { useEffect, useState } from "react"
import DocumentMeta from 'react-document-meta'
import { BreadCrumb } from '../../components'
import { SiteTitle } from './common'
import axios from 'axios'
import {
  postUrl,
  merchantId,
  merchantName,
  ApiDir,
  RouteDir,
} from '../../common'

const Howto = () =>
{
  const meta =
  {
    title: SiteTitle,
  }

  const Floors =
  [
    {
      name: 'ご利用について',
      href: '/howto'
    }
  ]

  //決済ID
  const [paymentId, setPaymentId] = useState('')

  //ハッシュ値
  const [hash, setHash] = useState('')

  useEffect(()=>{
    const getDateTime = ()=>
    {
      const toDoubleDigites = (num)=>
      {
        let number = String(num)
        if(number.length===1)
        {
          number = '0' + number
        }
        return number
      }
      const date = new Date()
      const datetime = String(date.getFullYear())+toDoubleDigites(date.getMonth()+1)+toDoubleDigites(date.getDate())+toDoubleDigites(date.getHours())+toDoubleDigites(date.getMinutes())+toDoubleDigites(date.getSeconds())
      return datetime
    }
    setPaymentId(getDateTime())
    const formData = new FormData()
    formData.append('trading_id', paymentId)  //決済ID
    console.log(paymentId)
    formData.append('payment_type', '03')  //支払い種別
    formData.append('id', 4000)  //請求金額
    formData.append('seq_merchant_id', merchantId)  //マーチャントID
    // formData.append('merchant_name', merchantName)  //マーチャントName
    // formData.append('payment_detail', '商品代')  //決済内容
    // formData.append('payment_detail_kana', 'ｼｮｳﾋﾝﾀﾞｲ')  //決済内容カナ
    // formData.append('return_url', RouteDir)  //戻りURL
    // formData.append('stop_return_url', RouteDir)  //処理中断戻りURL
    // formData.append('copy_right', merchantName)  //コピーライト
    // formData.append('finish_disable', 0)  //お支払完了画面表示※カード決済対象
    // formData.append('mail_send_flg_success', 1)  //決済申込が正常処理時のメール送信
    // formData.append('mail_send_flg_failure', 1)  //決済申込時に処理異常発生時のメール送信

    axios.post(ApiDir+'/generateHash.php',formData)
    .then(function(response){
      console.log(response.data.replace(/\r?\n/g,""))
      setHash(response.data.replace(/\r?\n/g,""))
    })
    .catch(function(error){
      console.log(error)
      return
    })

  },[paymentId])

  return(
    <DocumentMeta {...meta}>
      <div id="howto_page">
        <BreadCrumb
          floors = { Floors }
        />
        <main className="howto_content">
          <h1>Web決済テスト</h1>
          <section>
            <form action={postUrl} method="POST" id="send_form">
              <p>{paymentId}</p>
              <input type="hidden" name="trading_id" value={paymentId} />
              <input type="hidden" name="payment_type" value="03" />
              <input type="hidden" name="id" value="4000" />
              <input type="hidden" name="seq_merchant_id" value={merchantId} />
              {/* <input type="hidden" name="merchant_name" value='西彼' />
              <input type="hidden" name="payment_detail" value="商品代" />
              <input type="hidden" name="payment_detail_kana" value="ｼｮｳﾋﾝﾀﾞｲ" /> */}
              <input type="hidden" name="isbtob" value="0" />
              {/* <input type="hidden" name="return_url" value={RouteDir} />
              <input type="hidden" name="stop_return_url" value={RouteDir} />
              <input type="hidden" name="finish_disable" value="0" />
              <input type="hidden" name="mail_send_flg_success" value="1" />
              <input type="hidden" name="mail_send_flg_failure" value="1" /> */}
              <input type="hidden" name="hc" value={hash} />
              <button type="submit">送信</button>
            </form>
          </section>
        </main>
      </div>
    </DocumentMeta>
  )
}

export default Howto