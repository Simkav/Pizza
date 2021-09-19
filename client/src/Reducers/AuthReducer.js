const initialState = {
  isFetching: false,
  error: null,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "EDIT_USER":
      return { ...state, currentUserObject: action.payload };
    case "LOGIN_USER":
      return { ...state, currentUserObject: action.payload };
    case "AUTHORIZED":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}
