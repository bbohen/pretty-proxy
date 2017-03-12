import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import io from 'socket.io-client'; // eslint-disable-line

import App from './containers/App';
import initializeStore from './redux/init';

import './globalStyles';

const store = initializeStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('mount'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
}
