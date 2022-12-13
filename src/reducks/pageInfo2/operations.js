import {
  updateMoveToTopAfterLoginAction,
} from './actions'

//ローディングステータス変更
export const updateMoveToTopAfterLogin = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(updateMoveToTopAfterLoginAction(value))
  }
}
