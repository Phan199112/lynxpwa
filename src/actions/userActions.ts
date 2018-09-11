import { Auth } from 'aws-amplify';
import api from '../api';
import { ActionType } from '../reducers';
import { BaseUserType } from '../reducers/user';
import * as types from '../constants/actionTypes';
import { browserHistory } from '../services/HelperService';
import { ReduxThunkPromiseAction } from './';

function getUserError(error: string): ActionType {
  browserHistory.push('/login');

  return { type: types.GET_USER_ERROR, error };
}

export type GetAuthUserActionType = () => ReduxThunkPromiseAction;
export const getAuthUser: GetAuthUserActionType = () => {
  return (dispatch) => {
    dispatch({ type: types.USER_REQUEST });

    return Auth.currentAuthenticatedUser()
      .then(({ attributes }) => dispatch({
        type: types.GET_AUTH_USER_SUCCESS,
        payload: { email: attributes.email },
      }))
      .catch(error => dispatch(getUserError(error)));
  };
};

export type GetUserActionType = (email: string) => ReduxThunkPromiseAction;
export const getUser: GetUserActionType = email => (dispatch) => {
  dispatch({ type: types.USER_REQUEST });

  return api.getUser(email)
    .then(({ profile }) => dispatch({ type: types.GET_USER_SUCCESS, payload: { profile } }))
    .catch(error => dispatch(getUserError(error)));
};

export type UpdateUserActionType = (email: string, user: BaseUserType) => ReduxThunkPromiseAction;
export const updateUser: UpdateUserActionType = (email, user) => (dispatch) => {
  dispatch({ type: types.USER_REQUEST });

  // const formData = new FormData();
  // Object.keys(user).forEach((key: keyof UpdateUserType) => formData.append(key, user[key]));

  return api.updateUser(email, user)
    .then(() => dispatch({ type: types.UPDATE_USER_SUCCESS, payload: { user } }))
    .catch(() => dispatch({ type: types.UPDATE_USER_ERROR }));
};
