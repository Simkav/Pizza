import { put } from 'redux-saga/effects'
import ACTION from '../Actions/actionTypes'
import * as API from '../Api'

const parseAccessToken = accessToken =>
  JSON.parse(atob(accessToken.split('.')[1]))

export function * registerSaga ({ history, data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST })
    const {
      data: {
        data: { user }
      }
    } = yield API.AuthApi.signUp(data)
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user })
    history.push('/')
  } catch (e) {
    console.log(e)
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response.data.message })
  }
}

export function * loginSaga ({ history, data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST })
    const {
      data: { accesToken }
    } = yield API.AuthApi.signIn(data)
    const user = parseAccessToken(accesToken)
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user })
    history.push('/')
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response.data.message })
  }
}

export function * refreshSaga ({ data }) {
  try {
    yield put({ type: ACTION.AUTH_ACTION_REQUEST })
    const {
      data: { accesToken }
    } = yield API.AuthApi.refresh({ token: data.refreshToken })
    const user = parseAccessToken(accesToken)
    yield put({ type: ACTION.AUTH_ACTION_SUCCESS, user })
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response.data.message })
  }
}

export function * logoutSaga (action) {
  API.AuthApi.logout()
  yield put({ type: ACTION.CLEAR_STORE })
}
