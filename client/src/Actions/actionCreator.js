import ACTION from './actionTypes'

export const asideToggle = data => ({
  type: ACTION.ASIDE_TOGGLE,
  data: data
})

export const requestAuthRefresh = refreshToken => ({
  type: ACTION.AUTH_REFRESH,
  data: { refreshToken }
})

export const authActionLogin = (data, history) => ({
  type: ACTION.AUTH_ACTION_LOGIN,
  data: data,
  history: history
})

export const authActionRegister = (data, history) => ({
  type: ACTION.AUTH_ACTION_REGISTER,
  data: data,
  history: history
})

export const authActionClear = () => ({
  type: ACTION.AUTH_ACTION_CLEAR
})

export const authActionClearError = () => ({
  type: ACTION.AUTH_ACTION_CLEAR_ERROR
})

export const ingridientsActionGet = () => ({
  type: ACTION.INGRIDIENTS_ACTION_GET
})

export const ingridientsActionRemove = (id, ingridients) => ({
  type: ACTION.INGRIDIENTS_ACTION_REMOVE,
  id: id,
  ingridients: ingridients
})

export const ingridientsActionCreate = data => ({
  type: ACTION.INGRIDIENTS_ACTION_POST,
  data: data
})

export const ingridientsActionUpdate = (newIngridient, ingridients) => ({
  type: ACTION.INGRIDIENTS_ACTION_UPDATE,
  newIngridient: newIngridient,
  ingridients: ingridients
})

export const ingridientsActionClearError = () => ({
  type: ACTION.INGRIDIENTS_ACTION_CLEAR_ERROR
})

export const productsActionGet = () => ({
  type: ACTION.PRODUCTS_ACTION_GET
})

export const productsActionRemove = (id, products) => ({
  type: ACTION.PRODUCTS_ACTION_REMOVE,
  id: id,
  products: products
})

export const productsActionCreate = data => ({
  type: ACTION.PRODUCTS_ACTION_POST,
  data: data
})

export const productsActionUpdate = (newProduct, products) => ({
  type: ACTION.PRODUCTS_ACTION_UPDATE,
  newProduct: newProduct,
  products: products
})

export const productsActionClearError = () => ({
  type: ACTION.PRODUCTS_ACTION_CLEAR_ERROR
})
