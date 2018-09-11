import * as React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {
  SignUpPage,
  LoginPage,
  PricingPage,
  DatabasesPage,
  ReferralsPage,
  // ProfilePage,
  NotFoundPage,
} from '..';
import { PublicRoute, PrivateRoute } from '../../Route';
import '../../../styles/material-dashboard-pro-react.css';

const App = () => (
  <Switch>
    <Redirect exact from="/" to="/home" />
    <Redirect exact from="/logout" to="/login" />
    <PublicRoute path="/sign-up" component={SignUpPage} />
    <PublicRoute path="/login" component={LoginPage} />
    <PublicRoute path="/home" component={PricingPage} />
    <PrivateRoute path="/databases" component={DatabasesPage} />
    <PrivateRoute path="/referrals" component={ReferralsPage} />
    {/*
      <PrivateRoute path="/profile" component={ProfilePage} />
    */}
    <PublicRoute component={NotFoundPage} />
  </Switch>
);

export default App;
