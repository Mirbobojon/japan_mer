import React from 'react'

const MainContentH2 = (props) =>
{
  const h2Style =
  {
    // borderBottom: '1px dashed #343434',
    borderColor: props.borderColor
  }
  const circleStyle =
  {
    display:'inline-block',
    width: '10px',
    height: '10px',
    border: '3px solid #00584D',
    borderRadius: '10px',
    marginRight: '5px'
  }

  return(
    <h2 className='h2_title' style={h2Style}>
      {/* <span className="circle" style={circleStyle}></span> */}
      {props.title}
      <span>{props.title_span}</span>
    </h2>
  )
}
export default MainContentH2