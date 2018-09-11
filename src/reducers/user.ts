import { ActionType } from './';
import {
  USER_REQUEST,
  LOGIN_SUCCESS,
  GET_AUTH_USER_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

export type BaseUserType = {
  email: string,
  name?: string,
  // firstName?: string,
  // lastName?: string,
  street?: string,
  city?: string,
  zip?: string,
  state?: string,
};
export type UserType = BaseUserType & {
  images?: { name: string, img: string }[],
};
export type UserStateType = { user: UserType, isLoading: boolean };
const initialState: UserStateType = {
  user: { email: null },
  isLoading: false,
};

export default function userState(state = initialState, { type, payload }: ActionType) {
  switch (type) {
    case USER_REQUEST:
      return Object.assign({}, state, { isLoading: true });

    case GET_AUTH_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: { ...state.user, email: payload.email },
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: { ...state.user, email: payload.email },
      });

    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        user: { ...state.user, ...payload.profile },
      });

    case GET_USER_ERROR:
      return Object.assign({}, state, { isLoading: false });

    case UPDATE_USER_SUCCESS: {
      console.log(payload.user);

      return Object.assign({}, state, {
        isLoading: false,
        user: { ...state.user, ...payload.user },
      });
    }

    case UPDATE_USER_ERROR:
      return Object.assign({}, state, { isLoading: false });

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
