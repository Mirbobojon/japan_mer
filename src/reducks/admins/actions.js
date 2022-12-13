export const SELECT_ADMIN_LIST = 'SELECT_ADMIN_LIST'
export const selectAdminListAction = (adminState) =>
{
  return {
    type: 'SELECT_ADMIN_LIST',
    payload: {
      list: adminState
    }
  }
}

export const LOGIN_ADMIN = 'LOGIN_ADMIN'
export const loginAdminAction = (adminState) =>
{
  return {
    type: 'LOGIN_ADMIN',
    payload: {
      loginStatus: true,
      admin_id: adminState.id,
      name: adminState.name
    }
  }
}

export const LOGOUT_ADMIN = 'LOGOUT_ADMIN'
export const logoutAdminAction = (adminState) =>
{
  return {
    type: 'LOGOUT_ADMIN',
    payload: {
      loginStatus: false,
      admin_id: '',
      name: ''
    }
  }
}

export const CHANGE_REISSUE_MAILADDRESS = 'CHANGE_REISSUE_MAILADDRESS'
export const changeReissueMailAddressAction = (adminState) =>
{
  return {
    type: 'CHANGE_REISSUE_MAILADDRESS',
    payload: {
      reissueMailAddress: adminState,
    }
  }
}

