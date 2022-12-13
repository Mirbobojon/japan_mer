import React, { useCallback, useState } from 'react'

const OrderInsertItemNumberList= (props) =>
{

  //数量入力
  const [number, setNumber] = useState(0)
  const inputNumber = useCallback((event) =>
  {
    setNumber(event.target.value)
  }, [setNumber])


  return(
    <form encType="multipart/form-data" method="post" id={'insert_form_'+props.index+1} onSubmit={(e)=>e.preventDefault()} key={props.index} data-id={props.index}>
      <p>
        <span className="item_name">{props.item.name}</span>
        <span className="item_standard">{props.item.standard}</span>
        <span>数量</span>
        <input
          type = "text"
          name = {'number'}
          value = {number}
          onChange = {inputNumber}
        />
      </p>
    </form>
  )
}
export default OrderInsertItemNumberList