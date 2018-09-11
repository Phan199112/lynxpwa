import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import 'whatwg-fetch';
import { default as Amplify } from 'aws-amplify';
const awsConfig = require('../../../aws-exports').default;
import {
  saveInstallPromptEvent,
  SaveInstallPromptEventActionType,
  onInstallSuccess,
  OnInstallSuccessActionType,
  onOrientationChange,
  OnOrientationChangeActionType,
} from '../../../actions/appActions';
import { setBrowserHistory } from '../../../services/HelperService';
import { default as App } from './component';
import { PORTRAIT, LANDSCAPE } from '../../../constants';

Amplify.configure(awsConfig);

declare const screen: any;

type DispatchPropsType = {
  saveInstallPromptEvent: SaveInstallPromptEventActionType,
  onInstallSuccess: OnInstallSuccessActionType,
  onOrientationChange: OnOrientationChangeActionType,
};

type PropsType = DispatchPropsType & RouteComponentProps<{ location: Location }>;

class AppHOC extends React.Component<PropsType, {}> {
  componentDidMount() {
    setBrowserHistory(this.props.history);

    if (!!navigator.serviceWorker) {
      navigator.serviceWorker.register('/serviceWorker.js')
        .then(registration =>
          console.log('ServiceWorker registration successful with scope: ', registration.scope))
        .catch(err => console.log('ServiceWorker registration failed: ', err));
    }

    // window.addEventListener('beforeinstallprompt', (event: Event) => {
    //   console.log('app install prompt event');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // event.preventDefault();
      // this.props.saveInstallPromptEvent(event);

      // TODO: have logic to reshow this to user until accepted.
      // or does beforeinstallprompt fire automatically each time user opens the website??
      // (event as any).prompt();

      // Wait for the user to respond to the prompt
      // (event as any).userChoice
      //   .then((choiceResult: { outcome: string }) => {
      //     if (choiceResult.outcome === 'accepted') {
      //       console.log('User accepted the install prompt');
      //     } else {
      //       console.log('User dismissed the install prompt');
      //     }
      //   });
    // });

    // if (window.matchMedia('(display-mode: standalone)').matches) {
    //   console.log('display-mode is standalone');
    // }

    window.addEventListener('appinstalled', () => {
      console.log('app installed');
      this.props.onInstallSuccess();
    });

    window.addEventListener('orientationchange', () => {
      const orientationType = screen.msOrientation
        || (screen.orientation || screen.mozOrientation || {}).type;
      const orientation = orientationType && orientationType.indexOf(PORTRAIT) !== -1
        ? PORTRAIT
        : LANDSCAPE;

      this.props.onOrientationChange(orientation);
    }, false);
  }

  render() {
    return <App />;
  }
}

export default withRouter(connect<{}, DispatchPropsType>(
  null,
  { saveInstallPromptEvent, onInstallSuccess, onOrientationChange },
)(AppHOC));
