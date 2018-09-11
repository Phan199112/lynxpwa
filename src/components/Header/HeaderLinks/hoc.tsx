import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchTerm, SetSearchTermActionType } from '../../../actions/referralActions';
import {
  dismissNotification,
  DismissNotificationActionType,
} from '../../../actions/notificationActions';
import { StoreStateType } from '../../../reducers';
import { default as HeaderLinks } from './component';

type DispatchPropsType = {
  setSearchTerm: SetSearchTermActionType,
  dismissNotification: DismissNotificationActionType,
};
type PropsType = StoreStateType & DispatchPropsType & RouteComponentProps<{ location: Location }>;

const HeaderLinksHOC = (props: PropsType) => (
  <HeaderLinks
    onSearch={props.setSearchTerm}
    searchTerm={props.databaseState.searchTerm}
    notifications={props.notificationState.notifications}
    onNotificationDismiss={props.dismissNotification}
  />
);

export default withRouter(connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({
    databaseState: state.databaseState,
    notificationState: state.notificationState,
  }),
  { setSearchTerm, dismissNotification },
)(HeaderLinksHOC));
