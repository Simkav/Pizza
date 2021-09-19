const initState = false;

export default function (state = initState, action) {
  switch (action.type) {
    case "SWITCH_MENU":
      return action.payload;

    default:
      return state;
  }
}
