import { createStore, compose, applyMiddleware } from 'redux';
import { default as thunk } from 'redux-thunk';
import reducers from '../reducers';

type WindowType = { __REDUX_DEVTOOLS_EXTENSION__: () => () => void };
declare const window: WindowType;
declare const module: { hot: any };

const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(thunk);

const configureStore = (initialState = {}) => {
  const store = createStore(reducers, initialState, middleware);

  // Enable webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(reducers));
  }

  return store;
};

export default configureStore;
