export const INSERT_FLOOR = 'INSERT_FLOOR'
export const insertFloorAction = (pageInfoState) =>
{
  return {
    type: 'INSERT_FLOOR',
    payload: {
      floors: pageInfoState
    }
  }
}

export const INSERT_H1 = 'INSERT_H1'
export const insertH1Action = (pageInfoState) =>
{
  return {
    type: 'INSERT_H1',
    payload: {
      h1: pageInfoState
    }
  }
}

export const CHANGE_LOADING = 'CHANGE_LOADING'
export const changeLoadingAction = (pageInfoState) =>
{
  return {
    type: 'CHANGE_LOADING',
    payload: {
      loading: pageInfoState
    }
  }
}


