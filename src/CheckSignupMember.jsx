import { useEffect } from 'react';
import { signupMemberCheck } from './reducks/members/operations'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router";
import { push } from 'connected-react-router';
import { RouteDir } from './common';

const CheckSignupMember = (props) =>
{
  //シリアルをURLパラメータから取得
  const location = useLocation()
  const url = location.pathname
  var pageSerial = url.substr(url.indexOf('signup/') + 7);

  const dispatch = useDispatch()

  useEffect(()=>{
    //シリアルチェック
    dispatch(signupMemberCheck(pageSerial))
  },[dispatch, pageSerial])

  let SingupMemberStatus = useSelector(state => state.members.applicationMailAddress)

  if(SingupMemberStatus)
  {
    return props.children
  }
  else
  {
    // dispatch(push(RouteDir+'/error'))
    // return (null)
    return "無効なURLです。"
  }
}

export default CheckSignupMember;