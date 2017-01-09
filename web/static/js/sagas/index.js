import { take, put, call, fork, cancel }     from 'redux-saga/effects'
import { takeEvery }                         from 'redux-saga'
import * as actions                          from '../actions/constants'
import { showSnackbar }                      from '../actions'
import { api, getItem, setItem, removeItem } from '../services'
import { buildApiRequest }                   from '../services/apiBuilder'

function* processDataRequest(action) {
  const { requestName, successMsg, data } = action
  yield put({ type: requestName, data: data })
  const requestConfig = buildApiRequest(requestName, data)
  const { response, error, status } = yield call(api, requestConfig)

  if (error) {
    if (status === 403) yield put({ type: actions.NOT_AUTHENTICATED })
    if (status === 404 || status === 401) yield put({ type: actions.NAVIGATE_TO, path: '/notfound' })
    yield put({ type: actions[`${requestName}_FAILURE`], error: error })
  } else {
    yield put({ type: actions[`${requestName}_SUCCESS`], response: response })
    yield put({ type: actions.HIDE_DIALOG })
    if (successMsg) yield put(showSnackbar(successMsg))
  }
}

function* authenticate(requestName, data) {
  const { response, error } = yield call(api, buildApiRequest(requestName, data))

  if (!error) {
    yield call(setItem, 'auth-token', response.jwt)
    yield put({ type: actions.LOGIN_SUCCESS, response: response })
  } else {
    yield put({ type: actions.LOGIN_FAILURE, error: error })
  }
}

function* dataRequestFlow() {
  yield takeEvery(actions.DATA_REQUEST, processDataRequest)
}

function* logInFlow() {
  while (true) {
    const { data } = yield take(actions.LOGIN)
    const task = yield fork(authenticate, actions.LOGIN, data)
    const action = yield take([actions.LOGOUT_SUCCESS, actions.LOGIN_FAILURE])

    if (action.type === actions.LOGOUT_SUCCESS) {
      yield call(removeItem, 'auth-token')
      yield cancel(task)
    }
  }
}

function* logOutFlow() {
  while (true) {
    yield take(actions.LOGOUT_SUCCESS)
    yield call(removeItem, 'auth-token')
  }
}

function* registerFlow() {
  while (true) {
    const { data } = yield take(actions.REGISTER)
    const { response, error } = yield call(api, buildApiRequest(actions.REGISTER, data))

    if (!error) {
      yield call(setItem, 'auth-token', response.jwt)
      yield put({ type: actions.REGISTER_SUCCESS, response: response })
    } else {
      yield put({ type: actions.REGISTER_FAILURE, error: error})
    }
  }
}

export default function* rootSaga () {
  yield fork(dataRequestFlow)
  yield fork(logInFlow)
  yield fork(logOutFlow)
  yield fork(registerFlow)
}
