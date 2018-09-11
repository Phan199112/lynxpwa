import { ActionType } from './';
import {
  ORIENTATION_CHANGE,
  SAVE_INSTALL_PROMPT_EVENT,
  INSTALL_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';
import { PORTRAIT, LANDSCAPE } from '../constants';
import { isPortrait } from '../services/HelperService';

export type AppStateType = { orientation: string };
const initialState: AppStateType = {
  orientation: isPortrait() ? PORTRAIT : LANDSCAPE,
};

export default function logState(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case ORIENTATION_CHANGE:
      return Object.assign({}, state, { orientation: payload.orientation });

    case SAVE_INSTALL_PROMPT_EVENT:
      return Object.assign({}, state, { installPromptEvent: payload.event });

    case INSTALL_SUCCESS:
      return Object.assign({}, state, { isInstalled: true, installPromptEvent: null });

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
