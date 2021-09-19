import { takeLatest } from "@redux-saga/core/effects";
import ACTION from "../Actions/actionTypes";
import { registerSaga } from "./authSagas";

function* rootSaga() {
  yield takeLatest(ACTION.AUTH_REFRESH, registerSaga);
}

export default rootSaga;
