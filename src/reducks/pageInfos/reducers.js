import * as Actions from './actions'
import initialState from '../store/initialState'

export const PageInfosReducer = (state = initialState.pageInfos, action) =>
{
  switch(action.type)
  {
    case Actions.INSERT_FLOOR:
      return {
        ...state,
        ...action.payload
      }
    case Actions.INSERT_H1:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_LOADING:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}