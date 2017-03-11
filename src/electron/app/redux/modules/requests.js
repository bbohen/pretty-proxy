import io from 'socket.io-client'; // eslint-disable-line

const ADD = 'pretty-proxy/requests/ADD';
const ERROR = 'pretty-proxy/requests/ERROR';
const ESTABLISH_PROXY_CONNECTION = 'pretty-proxy/requests/ESTABLISH_PROXY_CONNECTION';
const INIT = 'pretty-proxy/requests/INIT';

const initialState = {
  connectedToProxyServer: false,
  list: [],
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case ADD: {
      return {
        ...state,
        list: [
          ...state.list,
          payload.request,
        ],
      };
    }
    case ERROR:
      return {
        ...state,
      };
    case ESTABLISH_PROXY_CONNECTION:
      return {
        ...state,
        connectedToProxyServer: true,
      };
    case INIT:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function addRequest(request) {
  return {
    type: ADD,
    payload: {
      request,
    },
  };
}

export function error(data) {
  return {
    type: ERROR,
    payload: {
      data,
    },
  };
}

export function establishConnection() {
  return {
    type: ESTABLISH_PROXY_CONNECTION,
  };
}

export function init() {
  return (dispatch) => {
    const socket = io('http://localhost:5060');

    socket.on('connection', () => dispatch(establishConnection()));
    socket.on('error', data => dispatch(error(data)));
    socket.on('request', request => dispatch(addRequest(request)));

    return {
      type: INIT,
    };
  };
}