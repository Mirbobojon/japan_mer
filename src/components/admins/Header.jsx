import React, { useEffect } from 'react'
import { logoutAdmin } from '../../reducks/admins/operations'
import { useDispatch, useSelector } from 'react-redux'
import { RouteDir } from '../../common'
import { push } from 'connected-react-router'

const Header = () =>
{
  const dispatch = useDispatch()

  const headerStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/logo_w.png')`
  }

  const logoutSpanStyle =
  {
    backgroundImage: `URL('${process.env.PUBLIC_URL}/images/icon_logout_w.svg')`
  }
  const admin = useSelector(state => state.admins)
  useEffect(()=>
  {
    const logoutBtn = document.getElementsByClassName('logout_btn')
    const length = logoutBtn.length
    for(let i=0;i<length;i++)
    {
      logoutBtn[i].addEventListener('mouseover',()=>
      {
        logoutBtn[i].querySelector('span').style.backgroundImage = `URL('${process.env.PUBLIC_URL}/images/icon_logout_g.png')`
      })
      logoutBtn[i].addEventListener('mouseout',()=>
      {
        logoutBtn[i].querySelector('span').style.backgroundImage = `URL('${process.env.PUBLIC_URL}/images/icon_logout_w.png')`
      })
    }
  },[])
  return(
    <header>
    {/* <header style={headerStyle}> */}
      <div className='header_logo'>
        <img src={process.env.PUBLIC_URL + '/images/logo_w.png'} alt="" onClick={() => dispatch(push(RouteDir+'/admin/items/list'))}/>
      </div>
      <div className="right_area">
        {admin.name && <p className="header_name_area">ログイン中　<span className={'name'}>{admin.name}さん</span></p>}
        {admin.loginStatus===true&&
          <button className="logout_btn" onClick={() => dispatch(logoutAdmin())}><span style={ logoutSpanStyle }>ログアウト</span></button>
        }
      </div>
    </header>
  )
}

export default Header