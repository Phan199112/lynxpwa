import * as types from '../constants/actionTypes';
import { ActionType } from '../reducers';

export type ClearErrorActionType = () => ActionType;
export const clearErrorState: ClearErrorActionType = () =>
  ({ type: types.CLEAR_ERROR_STATE });
