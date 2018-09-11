import * as React from 'react';
import { connect } from 'react-redux';
import { StoreStateType } from '../../../reducers';
import { login, LoginActionType, logout, LogoutActionType } from '../../../actions/authActions';
import { clearErrorState, ClearErrorActionType } from '../../../actions/errorActions';
import { default as LoginPage } from './component';

type DispatchPropsType = {
  login: LoginActionType,
  logout: LogoutActionType,
  clearErrorState: ClearErrorActionType,
};
type PropsType = StoreStateType & DispatchPropsType;

class LoginPageHOC extends React.Component<PropsType> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <LoginPage
        isLoading={this.props.authState.isLoading}
        onSubmit={this.props.login}
        error={this.props.errorState.formErrorMessage}
        onErrorClear={this.props.clearErrorState}
      />
    );
  }
}

export default connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({
    authState: state.authState,
    errorState: state.errorState,
  }),
  { login, logout, clearErrorState },
)(LoginPageHOC);
