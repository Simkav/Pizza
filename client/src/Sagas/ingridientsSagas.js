import { put } from "redux-saga/effects";
import ACTION from "../Actions/actionTypes";
import * as API from "../Api";

export function* getIngridientsSaga() {
  try {
    const {
      data: {
        data: { ingredients },
      },
    } = yield API.IngridientsCRUDApi.getIngridients();
    yield put({ type: ACTION.INGRIDIENTS_ACTION_SUCCESS, ingredients });
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.INGRIDIENTS_ACTION_ERROR });
  }
}

export function* removeIngridientSaga({ id }) {
  try {
    const { status } = yield API.IngridientsCRUDApi.removeIngridient(id);
    if (status === 200) {
      const {
        data: {
          data: { ingredients },
        },
      } = yield API.IngridientsCRUDApi.getIngridients();
      yield put({ type: ACTION.INGRIDIENTS_ACTION_SUCCESS, ingredients });
    } else {
      yield put({ type: ACTION.INGRIDIENTS_ACTION_ERROR });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.INGRIDIENTS_ACTION_ERROR });
  }
}

export function* createIngridientSaga({ data }) {
  try {
    const { status } = yield API.IngridientsCRUDApi.createIngridient(data);
    if (status === 200) {
      const {
        data: {
          data: { ingredients },
        },
      } = yield API.IngridientsCRUDApi.getIngridients();
      yield put({ type: ACTION.INGRIDIENTS_ACTION_SUCCESS, ingredients });
    } else {
      yield put({ type: ACTION.INGRIDIENTS_ACTION_ERROR });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.INGRIDIENTS_ACTION_ERROR });
  }
}
