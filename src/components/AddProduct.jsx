import React from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const AddProduct= (props) =>
{
  const dispatch = useDispatch()
  return(
    <button onClick={()=>dispatch(push({pathname:props.path}))}>
      {props.title}
    </button>
  )
}
export default AddProduct