import * as Actions from './actions'
import initialState from '../store/initialState'

export const OrdersReducer = (state = initialState.orders, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_ORDER_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.INSERT_PAY_TYPE:
      return {
        ...state,
        ...action.payload
      }
    case Actions.INSERT_POST_ADDRESS:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SELECT_ORDER_HISTORY_LIST:
    return {
      ...state,
      ...action.payload
    }
    case Actions.SELECT_ALL_ORDER_LIST:
    return {
      ...state,
      ...action.payload
    }
    case Actions.SELECT_ORDER:
    return {
      ...state,
      ...action.payload
    }
      default:
        return state

  }
}