import { put } from 'redux-saga/effects';
import ACTION from '../Actions/actionTypes';
import * as API from '../Api';

export function* getProductsSaga() {
  yield put({ type: ACTION.PRODUCTS_ACTION_GET_REQUEST });
  try {
    const { data: { data } } = yield API.ProductsCRUDApi.getProducts();
    yield put({ type: ACTION.PRODUCTS_ACTION_GET_SUCCESS, products: data });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.PRODUCTS_ACTION_GET_ERROR,
      error: e.response.data.error,
    });
  }
}
