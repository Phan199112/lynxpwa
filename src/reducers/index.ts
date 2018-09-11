import { combineReducers } from 'redux';
import { default as appState, AppStateType } from './app';
import { default as authState, AuthStateType } from './auth';
import { default as errorState, ErrorStateType } from './error';
import { default as notificationState, NotificationStateType } from './notification';
import { default as databaseState, DatabaseStateType } from './database';
import { default as referralState, ReferralStateType } from './referral';
import { default as userState, UserStateType } from './user';
import { default as modalState, ModalStateType } from './modal';

export type ActionType = { type: string, payload?: Record<string, any>, error?: string };

export type StoreStateType = {
  appState?: AppStateType,
  authState?: AuthStateType,
  errorState?: ErrorStateType,
  notificationState?: NotificationStateType,
  databaseState?: DatabaseStateType,
  referralState?: ReferralStateType,
  userState?: UserStateType,
  modalState?: ModalStateType,
};

const reducers = combineReducers({
  appState,
  authState,
  errorState,
  notificationState,
  databaseState,
  referralState,
  userState,
  modalState,
});

export default reducers;
