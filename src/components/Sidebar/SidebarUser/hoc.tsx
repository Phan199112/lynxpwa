import * as React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../../reducers';
import { default as SidebarUser } from './component';

type PropsType = { isMiniActive: boolean } & StoreStateType;

const SidebarUserHOC = ({ userState, ...props }: PropsType) => (
  <SidebarUser {...props} user={userState.user} />
);

export default connect<StoreStateType>(
  (state: StoreStateType) => ({ userState: state.userState }),
)(SidebarUserHOC);
