import io from 'socket.io-client'; // eslint-disable-line

const ADD = 'pretty-proxy/requests/ADD'; // TODO: does this naming still make sense?
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
      const { request } = payload;
      const matchingIndex = state.list.findIndex(item => item.id === request.id);
      const list = [...state.list];

      if (request.id && matchingIndex > -1) {
        list[matchingIndex] = {
          ...list[matchingIndex],
          ...request,
        };
      } else {
        list.push(request);
      }

      return {
        ...state,
        list,
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
    const socket = io('http://localhost:5060'); // global this with webpack

    socket.on('connection', () => dispatch(establishConnection()));
    socket.on('error', data => dispatch(error(data)));
    socket.on('request', request => dispatch(addRequest(request)));

    return {
      type: INIT,
    };
  };
}
