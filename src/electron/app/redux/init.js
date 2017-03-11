import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

/* eslint-disable no-underscore-dangle  */
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
/* eslint-enable */

export default () => createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);
