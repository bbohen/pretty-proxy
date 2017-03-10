// TODO: use standard flux actions

const ADD_REQUEST = 'pretty-proxy/requests/ADD';

const initialState = {
  requests: [],
};

export default function reducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case ADD_REQUEST:
      return {
        ...state,
      };
    default:
      return state;
  }
}
