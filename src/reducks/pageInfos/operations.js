import {
  insertFloorAction,
  insertH1Action,
  changeLoadingAction,
} from './actions'
import {push} from 'connected-react-router'
import axios from 'axios'
import { AdminsDir, ApiDir} from '../../common'


//パンくずリスト情報をstoreに挿入
export const insertFloor = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(insertFloorAction(value))
  }
}

//h1情報をstoreに挿入
export const insertH1 = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(insertH1Action(value))
  }
}

//ローディングステータス変更
export const changeLoading = (value) =>
{
  return async (dispatch) =>
  {
    dispatch(changeLoadingAction(value))
  }
}


