const initialState = {
  isAuth: false,
  currentUserObject: {}
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_USER':
      return { ...state, currentUserObject: action.payload };
    case "LOGIN_USER":
      return { ...state, currentUserObject: action.payload };
    case "AUTHORIZED":
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};
