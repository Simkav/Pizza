import ACTION from "../Actions/actionTypes";

const initState = {
  products: null,
  isFetching: false,
  error: null,
};

export default function productsReducer(state = initState, action) {
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
    case ACTION.PRODUCTS_ACTION_CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        products: action.products
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_IMAGE_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        products: action.products
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_INGREDIENTS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_OTHER_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_OTHER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        products: action.products
      }
    }
    case ACTION.PRODUCTS_ACTION_UPDATE_OTHER_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    }

    default:
      return state;
  }
}
