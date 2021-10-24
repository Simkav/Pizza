import { put, call, select } from 'redux-saga/effects';
import ACTION from '../Actions/actionTypes';
import * as API from '../Api';

export function* getIngridientsSaga() {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_GET_REQUEST });
  try {
    const { data } = yield API.IngridientsCRUDApi.getIngridients();
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_GET_SUCCESS,
      ingridients: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_GET_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* removeIngridientSaga({ id }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_REMOVE_REQUEST });
  try {
    const { status } = yield API.IngridientsCRUDApi.removeIngridient(id);
    if (status === 200) {
      const ingridients = yield select(
        ({ ingridients }) => ingridients.ingridients,
      );
      const newIngridients = yield ingridients.filter((item) => item.id !== id);
      yield put({
        type: ACTION.INGRIDIENTS_ACTION_REMOVE_SUCCESS,
        ingridients: newIngridients,
      });
    }
    if (status === 400) {
      yield call(getIngridientsSaga);
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_REMOVE_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* createIngridientSaga({ data }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_POST_REQUEST });
  try {
    const {
      data: { id, name },
    } = yield API.IngridientsCRUDApi.createIngridient(data);
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_POST_SUCCESS,
      ingridient: { name: name, id: id },
    });
  } catch (e) {
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_POST_ERROR,
      error: e.response.data.message,
    });
  }
}

export function* updateIngridientSaga({ newIngridient: { id, name } }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_UPDATE_REQUEST });
  try {
    const { status, data } = yield API.IngridientsCRUDApi.updateIngridient(
      id,
      name,
    );
    if (status === 200) {
      const ingridients = yield select(
        ({ ingridients }) => ingridients.ingridients,
      );
      const newIngridients = yield ingridients.map((item) =>
        item.id === id ? { id: data.id, name: data.name } : item,
      );
      yield put({
        type: ACTION.INGRIDIENTS_ACTION_UPDATE_SUCCESS,
        ingridients: newIngridients,
      });
    }
    if (status === 400) {
      yield call(getIngridientsSaga);
    }
  } catch (e) {
    console.log(e);
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_UPDATE_ERROR,
      error: e.response.data.message,
    });
  }
}
