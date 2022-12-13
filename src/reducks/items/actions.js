export const SELECT_ITEM_LIST = 'SELECT_ITEM_LIST'
export const selectItemListAction = (itemState) =>
{
  return {
    type: 'SELECT_ITEM_LIST',
    payload: {
      list: itemState
    }
  }
}

export const SELECT_ITEM = 'SELECT_ITEM'
export const selectItemAction = (itemState) =>
{
  return {
    type: 'SELECT_ITEM',
    payload: {
      selectItem: itemState
    }
  }
}

export const IMAGE_SRC = 'IMAGE_SRC'
export const imageSrcAction = (itemState) =>
{
  return {
    type: 'IMAGE_SRC',
    payload: {
      imageSrc: itemState
    }
  }
}

export const IMAGE_ID = 'IMAGE_ID'
export const imageIdAction = (itemState) =>
{
  return {
    type: 'IMAGE_ID',
    payload: {
      imageId: itemState
    }
  }
}

export const IMAGE_SRC_ARRAY = 'IMAGE_SRC_ARRAY'
export const imageSrcArrayAction = (itemState) =>
{
  return {
    type: 'IMAGE_SRC_ARRAY',
    payload: {
      imageSrcArray: itemState
    }
  }
}

export const IMAGE_ID_ARRAY = 'IMAGE_ID_ARRAY'
export const imageIdArrayAction = (itemState) =>
{
  return {
    type: 'IMAGE_ID_ARRAY',
    payload: {
      imageIdArray: itemState
    }
  }
}

export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const changeCategoryAction = (itemState) =>
{
  return {
    type: 'CHANGE_CATEGORY',
    payload: {
      selectCategory: itemState
    }
  }
}

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD'
export const changeKeywordAction = (itemState) =>
{
  return {
    type: 'CHANGE_KEYWORD',
    payload: {
      selectKeyword: itemState
    }
  }
}





