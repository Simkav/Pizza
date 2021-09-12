const initState = false;

export const hamburgerMenuReducer = (state = initState, action) => {
  switch (action.type) {
    case "SWITCH_MENU":
      return action.payload;

    default:
      return state;
  }
};
