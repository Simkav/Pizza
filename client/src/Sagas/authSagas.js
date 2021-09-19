import { put } from "redux-saga/effects";
import ACTION from "../Actions/actionTypes";
import * as API from "../Api";
import history from '../browserHistory'

export function* registerSaga(action) {
  yield put(ACTION.AUTH_ACTION_REQUEST);

  try {
      console.log('alllo')
    const {
      data: {
        data: { user },
      },
    } = yield API.signUp(action.data);
    history.replace("/");
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user });
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response });
  }
}
