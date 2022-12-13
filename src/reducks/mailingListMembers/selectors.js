import { createSelector } from "reselect";

const usersSelector = (state) => state.members;

export const getLoginStatus = createSelector(
  [usersSelector],
  state => state.loginStatus
)