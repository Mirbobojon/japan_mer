export const SELECT_ORDER_LIST = 'SELECT_ORDER_LIST'
export const selectOrderListAction = (orderState) =>
{
  return {
    type: 'SELECT_ORDER_LIST',
    payload: {
      list: orderState
    }
  }
}

export const INSERT_PAY_TYPE = 'INSERT_PAY_TYPE'
export const InsertPayTypeAction = (orderState) =>
{
  return {
    type: 'INSERT_PAY_TYPE',
    payload: {
      payType: orderState
    }
  }
}

export const INSERT_POST_ADDRESS = 'INSERT_POST_ADDRESS'
export const InsertPostAddressAction = (orderState) =>
{
  return {
    type: 'INSERT_POST_ADDRESS',
    payload: {
      postAddress: orderState
    }
  }
}

export const SELECT_ORDER_HISTORY_LIST = 'SELECT_ORDER_HISTORY_LIST'
export const selectOrderHistoryListAction = (orderState) =>
{
  return {
    type: 'SELECT_ORDER_HISTORY_LIST',
    payload: {
      history: orderState
    }
  }
}

export const SELECT_ALL_ORDER_LIST = 'SELECT_ALL_ORDER_LIST'
export const selectAllOrderListAction = (orderState) =>
{
  return {
    type: 'SELECT_ALL_ORDER_LIST',
    payload: {
      allOrder: orderState
    }
  }
}

export const SELECT_ORDER = 'SELECT_ORDER'
export const selectOrderAction = (orderState) =>
{
  return {
    type: 'SELECT_ORDER',
    payload: {
      selectOrder: orderState
    }
  }
}