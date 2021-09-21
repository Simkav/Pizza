import ACTION from "../Actions/actionTypes";

const initialState = {
  isFetching: false,
  error: null,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.AUTH_ACTION_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.AUTH_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        user: action.user,
      };
    }
    case ACTION.AUTH_ACTION_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.AUTH_ACTION_CLEAR: {
      return { ...initialState };
    }
    case ACTION.CLEAR_STORE:{
      return{
          ...state,
          user: null,
          error: null
      }
  }
    default:
      return state;
  }
}
