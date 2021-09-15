const initialState = {
  currentUser: {},
  isAuth: false,
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload };
    case "AUTHORIZED":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};
