import * as React from 'react';
import { Store } from 'redux';
import { render as renderDOM } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
const configureStore = require('./store/configureStore').default;
import ReduxApp from './ReduxApp';

declare const module: { hot: any };

const store = configureStore();

// in production, AppContainer is automatically disabled, and simply returns its children
const render = (Component: React.ComponentType<{ store: Store }>) => renderDOM(
  <AppContainer>
    <Component store={store} />
  </AppContainer>,
  document.getElementById('reactApp'),
);

render(ReduxApp);

if (module.hot) {
  module.hot.accept('./ReduxApp', () => {
    const UpdatedReduxApp = require('./ReduxApp').default;
    render(UpdatedReduxApp);
  });
}
