import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import io from 'socket.io-client'; // eslint-disable-line

import App from './containers/App';
import initializeStore from './redux/init';

const socket = io('http://localhost:5060');
const store = initializeStore();

socket.on('connection', () => {
  console.log('connected to proxy server!');
});

socket.on('error', () => {
  console.log('error connecting to proxy server!');
});

socket.on('request', (data) => {
  console.log('request', data);
});

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
