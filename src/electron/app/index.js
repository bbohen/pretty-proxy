import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import io from 'socket.io-client'; // eslint-disable-line

import App from './containers/App';

const socket = io('http://localhost:5060');

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
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('mount'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
}
