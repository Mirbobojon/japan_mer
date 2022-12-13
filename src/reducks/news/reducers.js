import * as Actions from './actions'
import initialState from '../store/initialState'

export const NewsReducer = (state = initialState.news, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_NEWS_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.IMAGE_SRC:
      return {
        ...state,
        ...action.payload
      }
    case Actions.IMAGE_ID:
      return {
        ...state,
        ...action.payload
      }

      default:
        return state

  }
}