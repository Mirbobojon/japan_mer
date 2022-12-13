import * as Actions from './actions'
import initialState from '../store/initialState'

export const CategoriesReducer = (state = initialState.categories, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_CATEGORY_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SELECT_CATEGORY:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}