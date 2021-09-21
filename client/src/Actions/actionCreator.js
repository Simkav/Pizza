import ACTION from "./actionTypes";

export const asideToggle = (data) => {
  return {
    type: ACTION.ASIDE_TOGGLE,
    data: data,
  };
};

export const requestAuthRefresh = (refreshToken) => ({
  type: ACTION.AUTH_REFRESH,
  data: { refreshToken },
});

export const authActionLogin = (data, history) => {
  return {
    type: ACTION.AUTH_ACTION_LOGIN,
    data: data,
    history: history,
  };
};

export const authActionRegister = (data, history) => {
  return {
    type: ACTION.AUTH_ACTION_REGISTER,
    data: data,
    history: history,
  };
};

export const authActionClear = () => {
  return {
      type: ACTION.AUTH_ACTION_CLEAR
  }
};
