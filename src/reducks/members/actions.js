export const SELECT_MEMBER_LIST = 'SELECT_MEMBER_LIST'
export const selectMemberListAction = (memberState) =>
{
  return {
    type: 'SELECT_MEMBER_LIST',
    payload: {
      list: memberState
    }
  }
}

export const CHANGE_APPLICATION_MAIL_ADDRESS = 'CHANGE_APPLICATION_MAIL_ADDRESS'
export const changeApplicationMailAddressAction = (memberState) =>
{
  return {
    type: 'CHANGE_APPLICATION_MAIL_ADDRESS',
    payload: {
      applicationMailAddress: memberState
    }
  }
}

export const LOGIN_MEMBER = 'LOGIN_MEMBER'
export const loginMemberAction = (memberState) =>
{
  return {
    type: 'LOGIN_MEMBER',
    payload: {
      loginStatus: true,
      member_id: memberState.id,
      name: memberState.family_name
    }
  }
}

export const LOGOUT_MEMBER = 'LOGOUT_MEMBER'
export const logoutMemberAction = (memberState) =>
{
  return {
    type: 'LOGOUT_MEMBER',
    payload: {
      loginStatus: false,
      member_id: '',
      name: ''
    }
  }
}

export const CHANGE_REISSUE_MAIL_ADDRESS = 'CHANGE_REISSUE_MAIL_ADDRESS'
export const changeReissueMailAddressAction = (memberState) =>
{
  return {
    type: 'CHANGE_REISSUE_MAIL_ADDRESS',
    payload: {
      reissueMailAddress: memberState
    }
  }
}


