export const SELECT_FAVORITE_LIST = 'SELECT_FAVORITE_LIST'
export const selectFavoriteListAction = (favoriteState) =>
{
  return {
    type: 'SELECT_FAVORITE_LIST',
    payload: {
      list: favoriteState
    }
  }
}

