import { put } from "redux-saga/effects";
import ACTION from "../Actions/actionTypes";
import * as API from "../Api";
import CONSTANTS from "../constants";

export function* registerSaga({ history, data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST });
    const {
      data: {
        data: {
          user,
          tokens: { refresh, access },
        },
      },
    } = yield API.AuthApi.signUp(data);
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
    window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, access);
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
        data: {
          user,
          tokens: { refresh, access },
        },
      },
    } = yield API.AuthApi.signIn(data);
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
    window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, access);
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
        data: {
          user,
          tokens: { refresh, access },
        },
      },
    } = yield API.AuthApi.refresh({ token: data.refreshToken });
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
    window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
    window.localStorage.setItem(CONSTANTS.ACCESS_TOKEN, access);
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}
