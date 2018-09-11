import { ActionType } from './';
import {
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATION_CLEAR,
  NOTIFICATION_CLEAR_ALL,
  LOGOUT_SUCCESS,
} from '../constants/actionTypes';

export type NotificationType = { id: number, msg: string };
export type NotificationStateType = { notifications: NotificationType[] };
const initialState: NotificationStateType = {
  notifications: [],
};

export default function logState(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case NOTIFICATIONS_FETCH_SUCCESS:
      return Object.assign({}, state, { notifications: payload.notifications });

    case NOTIFICATION_CLEAR:
      return Object.assign({}, state, {
        notifications: state.notifications.filter(({ id }) => id !== payload.notificationId),
      });

    case NOTIFICATION_CLEAR_ALL:
      return Object.assign({}, state, { notifications: [] });

    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
