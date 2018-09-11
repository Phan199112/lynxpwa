import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { getAuthUser, GetAuthUserActionType } from '../../../actions/userActions';
import { StoreStateType } from '../../../reducers';
import { PrivatePage } from '../../Page';
import Loader from '../../Loader';

type DispatchPropsType = {
  getAuthUser: GetAuthUserActionType,
};

type PropsType = {
  path: string,
  component: React.ComponentType,
} & StoreStateType & DispatchPropsType & RouteComponentProps<{ location: Location }>;

class PrivateRoute extends React.Component<PropsType, {}> {
  componentDidMount() {
    if (!this.props.userState.user.email) {
      this.props.getAuthUser();
    }
  }

  renderPrivatePage = () => <PrivatePage component={this.props.component} />;

  render() {
    const { path, userState } = this.props;
    const { isLoading, user } = userState;

    if (!user.email) {
      // if user is being fetched for the first time
      if (isLoading || user.email === null) {
        return <Loader isVisible isFullHeight />;
      }

      return <Redirect to="/home" />;
    }

    return <Route path={path} render={this.renderPrivatePage} />;
  }
}

export default withRouter(connect<StoreStateType, DispatchPropsType>(
  (state: StoreStateType) => ({ userState: state.userState }),
  { getAuthUser },
)(PrivateRoute));
