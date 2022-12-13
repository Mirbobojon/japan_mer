import { useEffect } from 'react';
import { Route, Redirect, useLocation } from "react-router";
import { LoginCheckAdmin } from './reducks/admins/operations'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir } from './common';


const MemberAuth = (props) =>
{
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(()=>{
    //ログインチェック
    dispatch(LoginCheckAdmin())
  },[dispatch])

  let adminLoginStatus = useSelector(state => state.admins.loginStatus)

  if(adminLoginStatus !== '' && adminLoginStatus){
    return props.children
  }
  else if(adminLoginStatus !== '' && !adminLoginStatus)
  {
    return (
      <Route path={`${RouteDir}/admin/*`} render={() => <Redirect to={{pathname:`${RouteDir}/admin/login`,state:{from:location.pathname}}} />} />
    )
  }
  else{
    return (
      <p>ログイン処理に失敗しました。</p>
    )
  }
}

export default MemberAuth;