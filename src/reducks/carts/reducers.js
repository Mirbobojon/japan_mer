import * as Actions from './actions'
import initialState from '../store/initialState'

export const CartsReducer = (state = initialState.carts, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_CART_LIST:
      return {
        ...state,
        ...action.payload
      }
      default:
        return state
  }
}