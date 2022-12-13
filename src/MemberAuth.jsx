import { useEffect } from 'react';
import { Route, Redirect, useLocation } from "react-router";
import { LoginCheckMember } from './reducks/members/operations'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir } from './common';


const MemberAuth = (props) =>
{
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(()=>{
    //ログインチェック
    dispatch(LoginCheckMember())
  },[dispatch])

  const memberId = sessionStorage.getItem('member_id')

  if(memberId !== '' && memberId !== null && memberId !== 'undefined'){
    return props.children
  }
  else
  {
    window.alert('ログインをしてください。')
    return (
      <Route path={`${RouteDir}/mypage/*`} render={() => <Redirect to={{pathname:`${RouteDir}/login`,state:{from:location.pathname}}} />} />
    )
  }

}

export default MemberAuth;