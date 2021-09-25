import { takeLatest } from "@redux-saga/core/effects";
import ACTION from "../Actions/actionTypes";
import { registerSaga, loginSaga, refreshSaga, logoutSaga } from "./authSagas";
import { createIngridientSaga, getIngridientsSaga, removeIngridientSaga, updateIngridientSaga } from "./ingridientsSagas";

function* rootSaga() {
  yield takeLatest(ACTION.AUTH_ACTION_REGISTER, registerSaga);
  yield takeLatest(ACTION.AUTH_ACTION_LOGIN, loginSaga);
  yield takeLatest(ACTION.AUTH_REFRESH, refreshSaga);
  yield takeLatest(ACTION.AUTH_ACTION_CLEAR, logoutSaga);
  yield takeLatest(ACTION.INGRIDIENTS_ACTION_GET, getIngridientsSaga);
  yield takeLatest(ACTION.INGRIDIENTS_ACTION_REMOVE, removeIngridientSaga);
  yield takeLatest(ACTION.INGRIDIENTS_ACTION_POST, createIngridientSaga);
  yield takeLatest(ACTION.INGRIDIENTS_ACTION_UPDATE, updateIngridientSaga);
}

export default rootSaga;
