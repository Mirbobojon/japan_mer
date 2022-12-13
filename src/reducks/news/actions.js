export const SELECT_NEWS_LIST = 'SELECT_NEWS_LIST'
export const selectNewsListAction = (newsState) =>
{
  return {
    type: 'SELECT_NEWS_LIST',
    payload: {
      list: newsState
    }
  }
}

export const IMAGE_SRC = 'IMAGE_SRC'
export const imageSrcAction = (newsState) =>
{
  return {
    type: 'IMAGE_SRC',
    payload: {
      imageSrc: newsState
    }
  }
}

export const IMAGE_ID = 'IMAGE_ID'
export const imageIdAction = (newsState) =>
{
  return {
    type: 'IMAGE_ID',
    payload: {
      imageId: newsState
    }
  }
}
