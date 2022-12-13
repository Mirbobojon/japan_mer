import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import { AdminsDir, RouteDir } from "../../common"

const Paging = (props) =>
{
  const dispatch = useDispatch()
  const [pageCount, setPageCount] = useState(1)
  const [pageConntArray, setPageCountArray] = useState([])

  useEffect(()=>{
    const length = Number(props.length)
    const showCount = Number(props.showCount)
    const rem = length % showCount
    const quo = length / showCount
    if(length !== 0 && showCount !== 0)
    {
      if(rem === 0)
      {
        setPageCount(quo)
      }
      else
      {
        setPageCount(Math.floor(quo) + 1)
      }
      let Array = []
      for(let i=0;i<pageCount; i++)
      {
        Array.push(i+1)
      }
      setPageCountArray(Array)
    }
  },[setPageCount, props, pageCount])

  const slugCange = (slug)=>
  {
    //最初に出てくる?の位置を取得
    const firstQueryPosition = slug.indexOf('?')

    //?を&に置き換える
    const newSlug = slug.replace(/\?/g,'&')

    //最初の&の前後の文字列を取得して、?に戻して繋げる
    const before = newSlug.substr(0,firstQueryPosition)
    const after = newSlug.substr(firstQueryPosition + 1)
    const ret = before + '?' + after

    return ret
  }

  const pageLink = (paged) =>
  {
    if(paged === 1)
    {
      if(props.publicPage)
      {
        dispatch(push(RouteDir + '/' + props.slug))
      }
      else
      {
        dispatch(push(AdminsDir + '/' + props.slug))
      }
    }
    else
    {
      if(props.publicPage)
      {
        dispatch(push(slugCange(RouteDir + '/' + props.slug +'?paged=' + paged)))
      }
      else
      {
        dispatch(push(slugCange(AdminsDir + '/' + props.slug +'?paged=' + paged)))
      }
    }
  }

  return(
    <div className="paging_area">
      {Number(props.paged) !== 1 &&
        <button className="pre_btn" onClick={()=>{pageLink(Number(props.paged) - 1)}}>{props.prevtext}</button>
      }
      {Array.isArray(pageConntArray) && pageConntArray.map((i)=>(
        i === Number(props.paged) ?
        <button key={i} className={'active'}>{i}</button>
        :
        <button key={i} onClick={()=>{pageLink(i)}}>{i}</button>
      ))}
      {pageCount !== Number(props.paged) &&
        <button className="next_btn" onClick={()=>{pageLink(Number(props.paged) + 1)}}>{props.nexttext}</button>
      }
    </div>
  )
}
export default Paging