import { ActionType } from './';
import {
  AUTH_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  CONFIRM_SIGN_UP_SUCCESS,
  CONFIRM_SIGN_UP_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

export type AuthStateType = {
  email: string,
  isLoading: boolean,
  isAwaitingConfirmation: boolean,
};
const initialState: AuthStateType = {
  email: null,
  isLoading: false,
  isAwaitingConfirmation: null,
};

export default function authState(state = initialState, { type, payload }: ActionType) {
  switch (type) {
    case AUTH_REQUEST:
      return Object.assign({}, state, { isLoading: true });

    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isAwaitingConfirmation: true,
        email: payload.email,
      });

    case CONFIRM_SIGN_UP_SUCCESS:
      return Object.assign({}, state, { isLoading: false, isAwaitingConfirmation: false });

    case SIGN_UP_ERROR:
      return Object.assign({}, state, { isLoading: false });

    case CONFIRM_SIGN_UP_ERROR:
      return Object.assign({}, state, { isLoading: false });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoading: false });

    case LOGIN_ERROR:
      return Object.assign({}, state, { isLoading: false });

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
