import * as Actions from './actions'
import initialState from '../store/initialState'

export const DepartmentsReducer = (state = initialState.departments, action) =>
{
  switch(action.type)
  {
    case Actions.SELECT_DEPARTMENT_LIST:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SELECT_DEPARTMENT:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state

  }
}