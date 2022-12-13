import * as Actions from './actions'
import initialState from '../store/initialState'

export const FavoritesReducer = (state = initialState.favorites, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_FAVORITE_LIST:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}