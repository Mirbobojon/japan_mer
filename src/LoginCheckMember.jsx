import { useEffect } from 'react';
import { LoginCheckMember } from './reducks/members/operations'
import { useDispatch } from 'react-redux'

const MemberLoginCheck = (props) =>
{
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('log')
    //ログイン時のお気に入り情報を買い物カゴ情報を取得してstateにセット
    dispatch(LoginCheckMember())
  },[dispatch])

  return props.children
}

export default MemberLoginCheck;