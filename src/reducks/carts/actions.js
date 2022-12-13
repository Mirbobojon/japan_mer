export const SELECT_CART_LIST = 'SELECT_CART_LIST'
export const selectCartListAction = (cartsState) =>
{
  return {
    type: 'SELECT_CART_LIST',
    payload: {
      list: cartsState,
    }
  }
}

