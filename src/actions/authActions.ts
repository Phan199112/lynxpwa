// TODO: if not using theme and views, switch to just @aws-amplify/auth package
// import Auth from '@aws-amplify/auth';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import * as types from '../constants/actionTypes';
import { browserHistory } from '../services/HelperService';
import { ActionType } from '../reducers';
import { ReduxThunkPromiseAction } from './';

function authRequest(): ActionType {
  return { type: types.AUTH_REQUEST };
}

function signUpSuccess(): ActionType {
  browserHistory.push('/login');

  return { type: types.CONFIRM_SIGN_UP_SUCCESS };
}

export type SignupActionType = (
  data: { name: string, email: string, password: string },
) => ReduxThunkPromiseAction;
export const signUp: SignupActionType = ({ name, email, password }) => {
  return (dispatch: Dispatch) => {
    dispatch(authRequest());

    return Auth.signUp({ username: email, password, attributes: { email, name } })
      .then(() => dispatch({ type: types.SIGN_UP_SUCCESS, payload: { email } }))
      .catch(error => dispatch({ type: types.SIGN_UP_ERROR, error }));
  };
};

export type ConfirmSignupActionType = (
  data: { email: string, code: string },
) => ReduxThunkPromiseAction;
export const confirmSignUp: ConfirmSignupActionType = ({ email, code }) => {
  return (dispatch) => {
    dispatch(authRequest());

    return Auth.confirmSignUp(email, code)
      .then(() => dispatch(signUpSuccess()))
      .catch(() => dispatch({
        type: types.CONFIRM_SIGN_UP_ERROR,
        error: 'Incorrect verification values',
      }));
  };
};

export type LoginActionType = (
  credentials: { identifier: string, password: string },
) => ReduxThunkPromiseAction;
export const login: LoginActionType = ({ identifier, password }) => {
  return (dispatch) => {
    dispatch(authRequest());

    return Auth.signIn(identifier, password)
      .then(() => {
        browserHistory.push('/');

        return dispatch({ type: types.LOGIN_SUCCESS, payload: { email: identifier } });
      })
      .catch(() => dispatch({ type: types.LOGIN_ERROR, error: 'Invalid credentials' }));
  };
};

function logoutSuccess(isWithLoginRedirection?: boolean): ActionType {
  if (isWithLoginRedirection) browserHistory.push('/login');

  return { type: types.LOGOUT_SUCCESS };
}

export type LogoutActionType = (isWithLoginRedirection?: boolean) => ReduxThunkPromiseAction;
export const logout: LogoutActionType = (isWithLoginRedirection) => {
  return (dispatch) => {
    dispatch(authRequest());

    return Auth.signOut()
      .then(() => dispatch(logoutSuccess(isWithLoginRedirection)))
      .catch(error => dispatch({ type: types.LOGOUT_ERROR, error }));
  };
};
