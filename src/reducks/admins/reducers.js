import * as Actions from './actions'
import initialState from '../store/initialState'

export const AdminsReducer = (state = initialState.admins, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_ADMIN_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.LOGIN_ADMIN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.LOGOUT_ADMIN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_REISSUE_MAILADDRESS:
      return {
        ...state,
        ...action.payload
      }
      default:
        return state

  }
}