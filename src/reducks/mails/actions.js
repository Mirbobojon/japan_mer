export const SELECT_MAIL_LIST = 'SELECT_MAIL_LIST'
export const selectMailListAction = (mailState) =>
{
  return {
    type: 'SELECT_MAIL_LIST',
    payload: {
      list: mailState
    }
  }
}

export const SELECT_MAILING_LIST = 'SELECT_MAILING_LIST'
export const selectMailingListAction = (mailState) =>
{
  return {
    type: 'SELECT_MAILING_LIST',
    payload: {
      mailingList: mailState
    }
  }
}

export const CHANGE_NEW_ADD_FLAG_STATE = 'CHANGE_NEW_ADD_FLAG_STATE'
export const changeNewAddFlagStateAction = (mailState) =>
{
  return {
    type: 'CHANGE_NEW_ADD_FLAG_STATE',
    payload: {
      newAddFlag: mailState
    }
  }
}

export const CHANGE_DESTINATION_TYPE_STATE = 'CHANGE_DESTINATION_TYPE_STATE'
export const changeDestinationTypeStateAction = (mailState) =>
{
  return {
    type: 'CHANGE_DESTINATION_TYPE_STATE',
    payload: {
      destinationType: mailState
    }
  }
}

export const CHANGE_TITLE_STATE = 'CHANGE_TITLE_STATE'
export const changeTitleStateAction = (mailState) =>
{
  return {
    type: 'CHANGE_TITLE_STATE',
    payload: {
      title: mailState
    }
  }
}

export const CHANGE_BODY_STATE = 'CHANGE_BODY_STATE'
export const changeBodyStateAction = (mailState) =>
{
  return {
    type: 'CHANGE_BODY_STATE',
    payload: {
      body: mailState
    }
  }
}

export const SELECT_MAIL = 'SELECT_MAIL'
export const selectMailAction = (mailState) =>
{
  return {
    type: 'SELECT_MAIL',
    payload: {
      destinationType: mailState.destination_type,
      title: mailState.title,
      body: mailState.body,
    }
  }
}

