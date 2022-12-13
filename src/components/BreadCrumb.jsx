import React from 'react'
import { RouteDir } from '../common'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

const BreadCrumb = (props) =>
{
  const dispatch = useDispatch()
  const floorsLength = props.floors.length;

  return(
    <div className="breadcrumb">
      <span onClick={()=>dispatch(push(RouteDir))}>トップページ</span>
      <span className="nolink">&gt;</span>
      {Array.isArray(props.floors) && props.floors.map((floor, i)=>{
        if(i < floorsLength -1)
        {
          return(
            <React.Fragment key={i}>
              <span onClick={()=>dispatch(push(RouteDir+floor.href))}>{floor.name}</span>
              <span className="nolink">&gt;</span>
            </React.Fragment>
          )
        }
        else
        {
          return(
            <span key={i} className="nolink">{floor.name}</span>
          )
        }
      })}
    </div>
  )
}

export default BreadCrumb