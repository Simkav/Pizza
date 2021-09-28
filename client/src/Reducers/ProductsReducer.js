import ACTION from "../Actions/actionTypes";

const initState = {
  products: null,
  isFetching: false,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case ACTION.PRODUCTS_ACTION_GET_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.PRODUCTS_ACTION_GET_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        products: action.products,
      };
    }
    case ACTION.PRODUCTS_ACTION_GET_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.PRODUCTS_ACTION_REMOVE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.PRODUCTS_ACTION_REMOVE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        products: action.products,
      };
    }
    case ACTION.PRODUCTS_ACTION_REMOVE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.PRODUCTS_ACTION_POST_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.PRODUCTS_ACTION_POST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        products: [...state.products, action.product],
      };
    }
    case ACTION.PRODUCTS_ACTION_POST_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    case ACTION.PRODUCTS_ACTION_UPDATE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        products: action.products,
      };
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}
