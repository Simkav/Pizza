import ACTION from "../Actions/actionTypes";

const initState = {
  ingridients: null,
  isFetching: false,
  error: false
};

export default function (state = initState, action) {
  switch (action.type) {
    case ACTION.INGRIDIENTS_ACTION_GET: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.INGRIDIENTS_ACTION_REMOVE: {
      return {
        ...state,
        isFetching: true,
        error: null,
        ingridients: action.ingredients,
      }
    }
    case ACTION.INGRIDIENTS_ACTION_POST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case ACTION.INGRIDIENTS_ACTION_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        ingridients: action.ingredients,
      };
    }
    default:
      return state;
  }
}
