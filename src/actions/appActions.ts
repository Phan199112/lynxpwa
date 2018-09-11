import * as types from '../constants/actionTypes';
import { ActionType } from '../reducers';

export type SaveInstallPromptEventActionType = (event: Event) => ActionType;
export const saveInstallPromptEvent: SaveInstallPromptEventActionType = event =>
({ type: types.SAVE_INSTALL_PROMPT_EVENT, payload: { event } });

export type OnInstallSuccessActionType = () => ActionType;
export const onInstallSuccess: OnInstallSuccessActionType = () =>
  ({ type: types.INSTALL_SUCCESS });

export type OnOrientationChangeActionType = (orientation: string) => ActionType;
export const onOrientationChange: OnOrientationChangeActionType = orientation =>
  ({ type: types.ORIENTATION_CHANGE, payload: { orientation } });
