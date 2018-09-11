import { Dispatch } from 'redux';
import api from '../api';
import { ReduxThunkPromiseAction } from './';
import { ActionType } from '../reducers';
import { NotificationType } from '../reducers/notification';
import * as types from '../constants/actionTypes';

export type GetNotificationsActionType = (email: string) => ReduxThunkPromiseAction;
export const getNotifications: GetNotificationsActionType = email => (dispatch: Dispatch) => {
  return api.getNotifications(email)
    .then((notifications: NotificationType[]) => dispatch({
      type: types.NOTIFICATIONS_FETCH_SUCCESS,
      payload: { notifications },
    }))
    .catch(() => dispatch({ type: types.NOTIFICATIONS_FETCH_ERROR }));
};

export type DismissNotificationActionType = (notificationId: number) => ActionType;
export const dismissNotification: DismissNotificationActionType = notificationId =>
  ({ type: types.NOTIFICATION_CLEAR, payload: { notificationId } });

export type DismissAllNotificationsActionType = () => ActionType;
export const dismissAllNotifications: DismissAllNotificationsActionType = () =>
  ({ type: types.NOTIFICATION_CLEAR_ALL });
