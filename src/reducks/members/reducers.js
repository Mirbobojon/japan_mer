import * as Actions from './actions'
import initialState from '../store/initialState'

export const MembersReducer = (state = initialState.members, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_MEMBER_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_APPLICATION_MAIL_ADDRESS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.LOGIN_MEMBER:
      return {
        ...state,
        ...action.payload
      }
    case Actions.LOGOUT_MEMBER:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_REISSUE_MAIL_ADDRESS:
      return {
        ...state,
        ...action.payload
      }

      default:
        return state

  }
}