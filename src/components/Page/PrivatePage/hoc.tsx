import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
// import { getUser, GetUserActionType } from '../../../actions/userActions';
import { getDatabases, GetDatabasesActionType } from '../../../actions/databaseActions';
import { getReferrals, GetReferralsActionType } from '../../../actions/referralActions';
// import {
//   getNotifications,
//   GetNotificationsActionType,
// } from '../../../actions/notificationActions';
import { StoreStateType } from '../../../reducers';
import { default as PrivatePage } from './component';

type DispatchPropsType = {
  // getUser: GetUserActionType,
  getDatabases: GetDatabasesActionType,
  getReferrals: GetReferralsActionType,
  // getNotifications: GetNotificationsActionType,
};

type PropsType = { component: React.ComponentType }
  & StoreStateType
  & DispatchPropsType
  & RouteComponentProps<{}>;

class PrivatePageHOC extends React.Component<PropsType, {}> {
  componentDidMount() {
    const { email } = this.props.userState.user;
    this.props.getDatabases(email);
    // this.props.getDatabases('sood@digitaldivvy.com');
    // this.props.getNotifications(email);
    // this.props.getUser(email);
  }

  componentDidUpdate({ databaseState, getReferrals }: PropsType) {
    const { selectedDatabase } = this.props.databaseState;
    if (databaseState.selectedDatabase.id !== selectedDatabase.id) {
      getReferrals(selectedDatabase.id);
    }
  }

  render() {
    const { component, location } = this.props;

    return (
      <PrivatePage location={location} component={component} />
    );
  }
}

export default withRouter(connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({
    userState: state.userState,
    databaseState: state.databaseState,
  }),
  { getDatabases, getReferrals },
)(PrivatePageHOC));
