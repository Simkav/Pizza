import { put } from "redux-saga/effects";
import ACTION from "../Actions/actionTypes";
import * as API from "../Api";

export function* getIngridientsSaga() {
  try {
    const {data : {data : {ingredients}}} = yield API.IngridientsCRUDApi.getIngridients();
    yield put({ type: ACTION.INGRIDIENTS_ACTION_SUCCESS, ingredients });
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.INGRIDIENTS_ACTION_ERROR });
  }
}
