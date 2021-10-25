import ACTION from '../Actions/actionTypes';

const initState = {
  ingridients: null,
  isFetching: false,
  error: null,
};

export default function ingridientsReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.INGRIDIENTS_ACTION_GET_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_GET_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ingridients: action.ingridients,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_GET_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.INGRIDIENTS_ACTION_REMOVE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_REMOVE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ingridients: action.ingridients,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_REMOVE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.INGRIDIENTS_ACTION_POST_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_POST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ingridients: [...state.ingridients, action.ingridient],
      };
    }
    case ACTION.INGRIDIENTS_ACTION_POST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.INGRIDIENTS_ACTION_UPDATE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ingridients: action.ingridients,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_UPDATE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
}
