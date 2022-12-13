import * as Actions from './actions'
import initialState from '../store/initialState'

export const PageInfo2Reducer = (state = initialState.pageInfo2, action) =>
{
  switch(action.type)
  {
    case Actions.UPDATE_MOVE_TO_TOP_AFTER_LOGIN:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}