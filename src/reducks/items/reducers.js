import * as Actions from './actions'
import initialState from '../store/initialState'

export const ItemsReducer = (state = initialState.items, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_ITEM_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SELECT_ITEM:
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
    case Actions.IMAGE_SRC_ARRAY:
      return {
        ...state,
        ...action.payload
      }
    case Actions.IMAGE_ID_ARRAY:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_CATEGORY:
      return {
        ...state,
        ...action.payload
      }
    case Actions.CHANGE_KEYWORD:
      return {
        ...state,
        ...action.payload
      }


      default:
        return state

  }
}