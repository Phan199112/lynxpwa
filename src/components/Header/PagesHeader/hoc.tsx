import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreStateType } from '../../../reducers';
import { default as PagesHeader } from './component';

type PropsType = StoreStateType & RouteComponentProps<{ location: Location }>;

const PagesHeaderHOC = ({ userState, ...props }: PropsType) => (
  <PagesHeader
    {...props}
    isLoggedIn={!!userState.user.email}
  />
);

export default withRouter(connect<StoreStateType>(
  (state: StoreStateType) => ({
    userState: state.userState,
  }),
)(PagesHeaderHOC));
