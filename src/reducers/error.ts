import { ActionType } from './';
import {
  CLEAR_ERROR_STATE,
  LOGIN_ERROR,
  CONFIRM_SIGN_UP_ERROR,
} from '../constants/actionTypes';

const formErrors: string[] = [LOGIN_ERROR, CONFIRM_SIGN_UP_ERROR];

export type ErrorStateType = { modalErrorMessage: string, formErrorMessage: string };
const initialState = { modalErrorMessage: '', formErrorMessage: '' };

export default function modalState(state = initialState, { type, error }: ActionType) {
  if (type.indexOf('_ERROR') === -1) {
    return state;
  }

  if (type === CLEAR_ERROR_STATE) return Object.assign({}, initialState);

  console.log('ERROR', error);

  const errorType = formErrors.indexOf(type) > -1 ? 'form' : 'modal';
  const message = error || 'There\'s been an error';

  if (errorType === 'modal') {
    return Object.assign({}, state, { modalErrorMessage: message });
  }

  return Object.assign({}, state, { formErrorMessage: message });
}
