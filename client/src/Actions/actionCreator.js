import ACTION from './actionTypes';

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
    type: ACTION.AUTH_ACTION_CLEAR,
  };
};

export const authActionClearError = () => {
  return {
    type: ACTION.AUTH_ACTION_CLEAR_ERROR,
  };
};

export const ingridientsActionGet = () => {
  return {
    type: ACTION.INGRIDIENTS_ACTION_GET,
  };
};

export const ingridientsActionRemove = (id, ingridients) => {
  return {
    type: ACTION.INGRIDIENTS_ACTION_REMOVE,
    id: id,
    ingridients: ingridients,
  };
};

export const ingridientsActionCreate = (data) => {
  return {
    type: ACTION.INGRIDIENTS_ACTION_POST,
    data: data,
  };
};

export const ingridientsActionUpdate = (newIngridient, ingridients) => {
  return {
    type: ACTION.INGRIDIENTS_ACTION_UPDATE,
    newIngridient: newIngridient,
    ingridients: ingridients,
  };
};

export const ingridientsActionClearError = () => {
  return {
    type: ACTION.INGRIDIENTS_ACTION_CLEAR_ERROR,
  };
};

export const productsActionGet = () => {
  return {
    type: ACTION.PRODUCTS_ACTION_GET,
  };
};

export const productsActionRemove = (id, products) => {
  return {
    type: ACTION.PRODUCTS_ACTION_REMOVE,
    id: id,
    products: products,
  };
};

export const productsActionCreate = (data) => {
  return {
    type: ACTION.PRODUCTS_ACTION_POST,
    data: data,
  };
};

export const productsActionUpdate = (newProduct, products) => {
  return {
    type: ACTION.PRODUCTS_ACTION_UPDATE,
    newProduct: newProduct,
    products: products,
  };
};

export const productsActionClearError = () => {
  return {
    type: ACTION.PRODUCTS_ACTION_CLEAR_ERROR,
  };
};
