export const UPDATE_MOVE_TO_TOP_AFTER_LOGIN = 'UPDATE_MOVE_TO_TOP_AFTER_LOGIN'
export const updateMoveToTopAfterLoginAction = (moveToTopAfterLogin) =>
{
  return {
    type: 'UPDATE_MOVE_TO_TOP_AFTER_LOGIN',
    payload: {
      moveToTopAfterLogin: moveToTopAfterLogin
    }
  }
}
