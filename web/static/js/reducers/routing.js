import { LOCATION_CHANGE } from 'react-router-redux'
import * as actions        from '../actions/constants'

const initialState = { locationBeforeTransitions: null }

const pathAfterSuccessfulAuth = (action) => {
  const user = action.response.user

  if (user.role === 'regular') {
    return `users/${user.id}/jogs`
  }

  return '/users'
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload }
    case actions.LOGIN_SUCCESS:
      return newState(state, pathAfterSuccessfulAuth(action))
    case actions.LOGOUT_SUCCESS:
      return newState(state, '/login')
    case actions.NAVIGATE_TO:
      return newState(state, action.path)
    case actions.NOT_ANONYMOUS:
      return newState(state, '/')
    case actions.NOT_AUTHENTICATED:
      return newState(state, '/login')
    case actions.NOT_AUTHORIZED:
      return newState(state, '/')
    case actions.REGISTER_SUCCESS:
      return newState(state, pathAfterSuccessfulAuth(action))
    default:
      return state
  }
}

const newState = (oldState, navigateTo) => ({
  ...oldState,
  locationBeforeTransitions: {
    ...oldState.locationBeforeTransitions,
    action  : 'PUSH',
    pathname: navigateTo
  }
})
