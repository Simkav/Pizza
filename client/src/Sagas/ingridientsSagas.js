import { put } from "redux-saga/effects";
import ACTION from "../Actions/actionTypes";
import * as API from "../Api";

export function* getIngridientsSaga() {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_GET_REQUEST });
  try {
    const {
      data: {
        data: { ingredients },
      },
    } = yield API.IngridientsCRUDApi.getIngridients();
    yield put({ type: ACTION.INGRIDIENTS_ACTION_GET_SUCCESS, ingredients });
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.INGRIDIENTS_ACTION_GET_ERROR, error: e });
  }
}

export function* removeIngridientSaga({ id, ingridients }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_REMOVE_REQUEST });
  try {
    const { status } = yield API.IngridientsCRUDApi.removeIngridient(id);
    if (status === 200) {
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
    yield put({ type: ACTION.INGRIDIENTS_ACTION_REMOVE_ERROR, error: e });
  }
}

export function* createIngridientSaga({ data }) {
  yield put({ type: ACTION.INGRIDIENTS_ACTION_POST_REQUEST });
  try {
    const {
      data: {
        data: { id },
      },
    } = yield API.IngridientsCRUDApi.createIngridient(data);
    yield put({
      type: ACTION.INGRIDIENTS_ACTION_POST_SUCCESS,
      ingridient: { name: data.name, id: id },
    });
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.INGRIDIENTS_ACTION_POST_ERROR, error: e });
  }
}
