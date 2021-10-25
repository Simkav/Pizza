import ACTION from './../Actions/actionTypes';

const initState = {
  cartItems: [],
};

export default function cartReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.CART_ACTION_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.data] };
    case ACTION.CART_ACTION_REMOVE_ITEM:
      return { ...state, cartItems: action.data };
    case ACTION.CART_ACTION_UPDATE_ITEM:
      return { ...state, cartItems: action.data };

    default:
      return state;
  }
}
