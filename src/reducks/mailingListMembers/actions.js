export const SELECT_MAILING_LIST_LIST = 'SELECT_MAILING_LIST_LIST'
export const selectMailingListListAction = (mailingListState) =>
{
  return {
    type: 'SELECT_MAILING_LIST_LIST',
    payload: {
      mailingList: mailingListState
    }
  }
}

export const SELECT_MAILING_LIST_MEMBER_LIST = 'SELECT_MAILING_LIST_MEMBER_LIST'
export const selectMailingListMemberListAction = (mailingListState) =>
{
  return {
    type: 'SELECT_MAILING_LIST_MEMBER_LIST',
    payload: {
      list: mailingListState
    }
  }
}

