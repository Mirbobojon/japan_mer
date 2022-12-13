import * as Actions from './actions'
import initialState from '../store/initialState'

export const MailsReducer = (state = initialState.mails, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_MAIL_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SELECT_MAILING_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_NEW_ADD_FLAG_STATE:
    return {
      ...state,
      ...action.payload
    }
    case Actions.CHANGE_DESTINATION_TYPE_STATE:
    return {
      ...state,
      ...action.payload
    }
    case Actions.CHANGE_TITLE_STATE:
    return {
      ...state,
      ...action.payload
    }
    case Actions.CHANGE_BODY_STATE:
    return {
      ...state,
      ...action.payload
    }
    case Actions.SELECT_MAIL:
    return {
      ...state,
      ...action.payload
    }

    default:
      return state

  }
}