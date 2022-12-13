import{
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

import{ItemsReducer} from '../items/reducers'
import{CategoriesReducer} from '../categories/reducers'
import{DepartmentsReducer} from '../departments/reducers'
import{MembersReducer} from '../members/reducers'
import{AdminsReducer} from '../admins/reducers'
import{NewsReducer} from '../news/reducers'
import{MailingListMembersReducer} from '../mailingListMembers/reducers'
import{MailsReducer} from '../mails/reducers'
import{PageInfo2Reducer} from '../pageInfo2/reducers'
import{PageInfosReducer} from '../pageInfos/reducers'
import{FavoritesReducer} from '../favorites/reducers'
import{CartsReducer} from '../carts/reducers'
import{OrdersReducer} from '../orders/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history)
{
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      items: ItemsReducer,
      categories: CategoriesReducer,
      departments: DepartmentsReducer,
      members: MembersReducer,
      admins: AdminsReducer,
      news: NewsReducer,
      mailingListMembers: MailingListMembersReducer,
      mails: MailsReducer,
      pageInfo2: PageInfo2Reducer,
      pageInfos: PageInfosReducer,
      favorites: FavoritesReducer,
      carts: CartsReducer,
      orders: OrdersReducer,
    }),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  )
}