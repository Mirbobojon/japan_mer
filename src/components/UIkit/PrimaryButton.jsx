import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/styles'

const Primarybutton = (props) =>
{
  return (
    <Button className={props.className} variant='contained' onClick={(e)=>props.onClick(e)}>
      {props.label}
    </Button>
  )
}

export default Primarybutton