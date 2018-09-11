
import { ActionType } from './';
import {
  MODAL_OPEN,
  MODAL_CLOSE,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

export type ModalStateType = {
  isOpen: boolean,
  id: string,
  data?: any,
  actions?: any,
};
const initialState: ModalStateType = {
  isOpen: false,
  id: null,
  data: null,
};

export default function logState(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case MODAL_OPEN:
      return Object.assign({}, state, { isOpen: true, ...payload });

    case MODAL_CLOSE:
      return Object.assign({}, initialState);

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
