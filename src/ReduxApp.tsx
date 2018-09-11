import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/Page/App';

type PropsType = { store: Store };

const ReduxApp = ({ store }: PropsType) => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default ReduxApp;
