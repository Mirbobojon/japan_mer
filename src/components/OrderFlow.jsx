import React from 'react'

const OrderFlow = (props) =>
{
  const flowArray =[
    { number:'01', label:'買い物カゴ'},
    { number:'02', label:'お客様情報'},
    { number:'03', label:'内容確認'},
    { number:'04', label:'ご注文完了'},
  ]
  return(
    <section id="order_flow_area">
      <div className="wrap">
        <ul>
          {flowArray.map((item, i)=>(
            <li key={i} className={i===props.activeKey?'active':''}>
              <span className="number">{item.number}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default OrderFlow