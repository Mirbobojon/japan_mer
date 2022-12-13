import { useEffect } from 'react';
import { reissueCheck } from './reducks/admins/operations'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router";
import { push } from 'connected-react-router';
import { RouteDir } from './common';

const CheckReissueAdmin = (props) =>
{
  //シリアルをURLパラメータから取得
  const location = useLocation()
  const url = location.pathname
  var pageSerial = url.substr(url.indexOf('admin_reissue/') + 14);

  const dispatch = useDispatch()

  useEffect(()=>{
    //シリアルチェック
    dispatch(reissueCheck(pageSerial))
  },[dispatch, pageSerial])

  let ReissueAdminStatus = useSelector(state => state.admins.reissueMailAddress)

  if(ReissueAdminStatus)
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

export default CheckReissueAdmin;