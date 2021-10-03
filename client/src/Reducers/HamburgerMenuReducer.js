import ACTION from './../Actions/actionTypes'

const initState = {
  isOpened: false
};

export default function hamburgerMenuReducer(state = initState, action) {
  switch (action.type) {
    case ACTION.ASIDE_TOGGLE:
      return {
        isOpened: action.data
      };

    default:
      return state;
  }
}
