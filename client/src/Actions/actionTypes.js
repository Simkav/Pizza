const authActionTypes = {
  AUTH_REFRESH: 'AUTH_REFRESH',

  AUTH_ACTION_LOGIN: 'AUTH_ACTION_LOGIN',

  AUTH_ACTION_REGISTER: 'AUTH_ACTION_REGISTER',

  AUTH_ACTION_REQUEST: 'AUTH_ACTION_REQUEST',
  AUTH_ACTION_SUCCESS: 'AUTH_ACTION_SUCCESS',
  AUTH_ACTION_ERROR: 'AUTH_ACTION_ERROR',

  AUTH_ACTION_CLEAR: 'AUTH_ACTION_CLEAR',

  AUTH_ACTION_CLEAR_ERROR: 'AUTH_ACTION_CLEAR_ERROR',
};

const ingredientsActionTypes = {
  INGRIDIENTS_ACTION_GET: 'INGRIDIENTS_ACTION_GET',
  INGRIDIENTS_ACTION_POST: 'INGRIDIENTS_ACTION_POST',
  INGRIDIENTS_ACTION_UPDATE: 'INGRIDIENTS_ACTION_UPDATE',
  INGRIDIENTS_ACTION_REMOVE: 'INGRIDIENTS_ACTION_REMOVE',

  INGRIDIENTS_ACTION_GET_REQUEST: 'INGRIDIENTS_ACTION_GET_REQUEST',
  INGRIDIENTS_ACTION_POST_REQUEST: 'INGRIDIENTS_ACTION_POST_REQUEST',
  INGRIDIENTS_ACTION_UPDATE_REQUEST: 'INGRIDIENTS_ACTION_UPDATE_REQUEST',
  INGRIDIENTS_ACTION_REMOVE_REQUEST: 'INGRIDIENTS_ACTION_REMOVE_REQUEST',

  INGRIDIENTS_ACTION_GET_SUCCESS: 'INGRIDIENTS_ACTION_GET_SUCCESS',
  INGRIDIENTS_ACTION_POST_SUCCESS: 'INGRIDIENTS_ACTION_POST_SUCCESS',
  INGRIDIENTS_ACTION_UPDATE_SUCCESS: 'INGRIDIENTS_ACTION_UPDATE_SUCCESS',
  INGRIDIENTS_ACTION_REMOVE_SUCCESS: 'INGRIDIENTS_ACTION_REMOVE_SUCCESS',

  INGRIDIENTS_ACTION_GET_ERROR: 'INGRIDIENTS_ACTION_GET_ERROR',
  INGRIDIENTS_ACTION_POST_ERROR: 'INGRIDIENTS_ACTION_POST_ERROR',
  INGRIDIENTS_ACTION_UPDATE_ERROR: 'INGRIDIENTS_ACTION_UPDATE_ERROR',
  INGRIDIENTS_ACTION_REMOVE_ERROR: 'INGRIDIENTS_ACTION_REMOVE_ERROR',

  INGRIDIENTS_ACTION_CLEAR_ERROR: 'INGRIDIENTS_ACTION_CLEAR_ERROR',
};

const productsActionTypes = {
  PRODUCTS_ACTION_GET: 'PRODUCTS_ACTION_GET',
  PRODUCTS_ACTION_POST: 'PRODUCTS_ACTION_POST',
  PRODUCTS_ACTION_UPDATE: 'PRODUCTS_ACTION_UPDATE',
  PRODUCTS_ACTION_REMOVE: 'PRODUCTS_ACTION_REMOVE',

  PRODUCTS_ACTION_GET_REQUEST: 'PRODUCTS_ACTION_GET_REQUEST',
  PRODUCTS_ACTION_POST_REQUEST: 'PRODUCTS_ACTION_POST_REQUEST',
  PRODUCTS_ACTION_UPDATE_REQUEST: 'PRODUCTS_ACTION_UPDATE_REQUEST',
  PRODUCTS_ACTION_REMOVE_REQUEST: 'PRODUCTS_ACTION_REMOVE_REQUEST',

  PRODUCTS_ACTION_GET_SUCCESS: 'PRODUCTS_ACTION_GET_SUCCESS',
  PRODUCTS_ACTION_POST_SUCCESS: 'PRODUCTS_ACTION_POST_SUCCESS',
  PRODUCTS_ACTION_UPDATE_SUCCESS: 'PRODUCTS_ACTION_UPDATE_SUCCESS',
  PRODUCTS_ACTION_REMOVE_SUCCESS: 'PRODUCTS_ACTION_REMOVE_SUCCESS',

  PRODUCTS_ACTION_GET_ERROR: 'PRODUCTS_ACTION_GET_ERROR',
  PRODUCTS_ACTION_POST_ERROR: 'PRODUCTS_ACTION_POST_ERROR',
  PRODUCTS_ACTION_UPDATE_ERROR: 'PRODUCTS_ACTION_UPDATE_ERROR',
  PRODUCTS_ACTION_REMOVE_ERROR: 'PRODUCTS_ACTION_REMOVE_ERROR',

  PRODUCTS_ACTION_CLEAR_ERROR: 'PRODUCTS_ACTION_CLEAR_ERROR',
};

const productsActionUpdateTypes = {
  PRODUCTS_ACTION_UPDATE_IMAGE: 'PRODUCTS_ACTION_UPDATE_IMAGE',
  PRODUCTS_ACTION_UPDATE_INGREDIENTS: 'PRODUCTS_ACTION_UPDATE_INGREDIENTS',
  PRODUCTS_ACTION_UPDATE_OTHER: 'PRODUCTS_ACTION_UPDATE_OTHER',

  PRODUCTS_ACTION_UPDATE_IMAGE_REQUEST: 'PRODUCTS_ACTION_UPDATE_IMAGE_REQUEST',
  PRODUCTS_ACTION_UPDATE_INGREDIENTS_REQUEST:
    'PRODUCTS_ACTION_UPDATE_INGREDIENTS_REQUEST',
  PRODUCTS_ACTION_UPDATE_OTHER_REQUEST: 'PRODUCTS_ACTION_UPDATE_OTHER_REQUEST',

  PRODUCTS_ACTION_UPDATE_IMAGE_SUCCESS: 'PRODUCTS_ACTION_UPDATE_IMAGE_SUCCESS',
  PRODUCTS_ACTION_UPDATE_INGREDIENTS_SUCCESS:
    'PRODUCTS_ACTION_UPDATE_INGREDIENTS_SUCCESS',
  PRODUCTS_ACTION_UPDATE_OTHER_SUCCESS: 'PRODUCTS_ACTION_UPDATE_OTHER_SUCCESS',

  PRODUCTS_ACTION_UPDATE_IMAGE_ERROR: 'PRODUCTS_ACTION_UPDATE_IMAGE_ERROR',
  PRODUCTS_ACTION_UPDATE_INGREDIENTS_ERROR:
    'PRODUCTS_ACTION_UPDATE_INGREDIENTS_ERROR',
  PRODUCTS_ACTION_UPDATE_OTHER_ERROR: 'PRODUCTS_ACTION_UPDATE_OTHER_ERROR',
};

const miscActionTypes = {
  CLEAR_STORE: 'CLEAR_STORE',
  ASIDE_TOGGLE: 'ASIDE_TOGGLE',
};

const cartActionTypes = {
  CART_ACTION_ADD_ITEM: 'CART_ACTION_ADD_ITEM',
  CART_ACTION_REMOVE_ITEM: 'CART_ACTION_REMOVE_ITEM',
  CART_ACTION_UPDATE_ITEM: 'CART_ACTION_UPDATE_ITEM',
};

const modalsActionTypes = {
  OPEN_ADD_MODAL: 'OPEN_ADD_MODAL',
  OPEN_DELETE_MODAL: 'OPEN_DELETE_MODAL',
  OPEN_EDIT_MODAL: 'OPEN_EDIT_MODAL',

  ON_CLOSE_ADD_MODAL: 'ON_CLOSE_ADD_MODAL',
  ON_CLOSE_DELETE_MODAL: 'ON_CLOSE_DELETE_MODAL',
  ON_CLOSE_EDIT_MODAL: 'ON_CLOSE_EDIT_MODAL',

  ON_ADD_MODAL_CLOSED: 'ON_ADD_MODAL_CLOSED',
  ON_DELETE_MODAL_CLOSED: 'ON_DELETE_MODAL_CLOSED',
  ON_EDIT_MODAL_CLOSED: 'ON_EDIT_MODAL_CLOSED',
};

export default {
  ...miscActionTypes,
  ...productsActionTypes,
  ...productsActionUpdateTypes,
  ...ingredientsActionTypes,
  ...authActionTypes,
  ...cartActionTypes,
  ...modalsActionTypes,
};
