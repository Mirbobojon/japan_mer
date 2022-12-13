import * as Actions from './actions'
import initialState from '../store/initialState'

export const MailingListMembersReducer = (state = initialState.mailingListMembers, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_MAILING_LIST_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SELECT_MAILING_LIST_MEMBER_LIST:
      return {
        ...state,
        ...action.payload
      }


      default:
        return state

  }
}