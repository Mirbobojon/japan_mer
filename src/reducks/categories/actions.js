export const SELECT_CATEGORY_LIST = 'SELECT_CATEGORY_LIST'
export const selectCategoryListAction = (categoryState) =>
{
  return {
    type: 'SELECT_CATEGORY_LIST',
    payload: {
      list: categoryState
    }
  }
}

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const selectCategoryAction = (categoryState) =>
{
  return {
    type: 'SELECT_CATEGORY',
    payload: {
      selectCategory: categoryState
    }
  }
}

