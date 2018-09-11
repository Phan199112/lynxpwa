import { ActionType } from '../reducers';
import * as types from '../constants/actionTypes';

export type ModalOpenActionType = ({ id, data, actions }: any) => ActionType;
export const openModal: ModalOpenActionType = ({ id, data, actions }) =>
  ({ type: types.MODAL_OPEN, payload: { id, data, actions } });

export type ModalCloseActionType = () => ActionType;
export const closeModal: ModalCloseActionType = () =>
  ({ type: types.MODAL_CLOSE });
