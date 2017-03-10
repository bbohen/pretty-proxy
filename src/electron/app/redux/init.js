import { createStore } from 'redux';

import rootReducer from './rootReducer';

export default () =>
  createStore(
    rootReducer,
    /* eslint-disable no-underscore-dangle */
    process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable */
  );
