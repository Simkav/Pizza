import { put } from "redux-saga/effects";
import ACTION from "../Actions/actionTypes";
import * as API from "../Api";

export function* registerSaga({ history, data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST });
    const {
      data: {
        data: { user },
      },
    } = yield API.AuthApi.signUp(data);
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    history.push("/");
  } catch (e) {
    console.log(e);
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response });
  }
}

export function* loginSaga({ history, data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST });
    const {
      data: {
        data: { user },
      },
    } = yield API.AuthApi.signIn(data);
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    history.push("/");
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}

export function* refreshSaga({ data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST });
    const {
      data: {
        data: { user },
      },
    } = yield API.AuthApi.refresh({ token: data.refreshToken });
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}

export function* logoutSaga(action) {
  API.AuthApi.logout();
  yield put({ type: ACTION.CLEAR_STORE });
}
