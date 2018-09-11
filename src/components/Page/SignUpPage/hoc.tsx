import * as React from 'react';
import { connect } from 'react-redux';
import {
  signUp,
  SignupActionType,
  confirmSignUp,
  ConfirmSignupActionType,
  logout,
  LogoutActionType,
} from '../../../actions/authActions';
import { clearErrorState, ClearErrorActionType } from '../../../actions/errorActions';
import { StoreStateType } from '../../../reducers';
import { default as SignUpPage } from './component';

type DispatchPropsType = {
  signUp: SignupActionType,
  confirmSignUp: ConfirmSignupActionType,
  logout: LogoutActionType,
  clearErrorState: ClearErrorActionType,
};

type PropsType = StoreStateType & DispatchPropsType;

class SignUpPageHOC extends React.Component<PropsType, {}> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const { authState, errorState } = this.props;

    return (
      <SignUpPage
        email={authState.email}
        isConfirmation={authState.isAwaitingConfirmation}
        onSubmit={this.props.signUp}
        onConfirmSubmit={this.props.confirmSignUp}
        isLoading={authState.isLoading}
        error={errorState.formErrorMessage}
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
  { signUp, confirmSignUp, logout, clearErrorState },
)(SignUpPageHOC);
