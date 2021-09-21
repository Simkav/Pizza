import { takeLatest } from "@redux-saga/core/effects";
import ACTION from "../Actions/actionTypes";
import { registerSaga, loginSaga, refreshSaga, logoutSaga } from "./authSagas";

function* rootSaga() {
  yield takeLatest(ACTION.AUTH_ACTION_REGISTER, registerSaga);
  yield takeLatest(ACTION.AUTH_ACTION_LOGIN, loginSaga);
  yield takeLatest(ACTION.AUTH_REFRESH, refreshSaga);
  yield takeLatest(ACTION.AUTH_ACTION_CLEAR, logoutSaga);
}

export default rootSaga;
