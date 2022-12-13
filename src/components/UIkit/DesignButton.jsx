import React from 'react'

const Designbutton = (props) =>
{
  const style =
  {
    width: '100%',
    padding: '15px',
    margin: '20px auto',
    ...props.Style
  }
  return (
    <button
      style={style}
      className = {props.className}
      onClick={(e)=>props.onClick(e)}>
        {props.label}
    </button>
  )
}

export default Designbutton