import * as actions from '../actions/constants'

const initialState = {
  authenticating: false,
  currentUser   : null,
  error         : null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.GET_CURRENTUSER:
    case actions.LOGIN:
    case actions.REGISTER:
      return { ...state, error: null, authenticating: true }
    case actions.GET_CURRENTUSER_SUCCESS:
    case actions.LOGIN_SUCCESS:
    case actions.REGISTER_SUCCESS:
      return { ...state, error: null, authenticating: false, currentUser: action.response.user }
    case actions.GET_CURRENTUSER_FAILURE:
    case actions.LOGIN_FAILURE:
    case actions.REGISTER_FAILURE:
      return { ...state, error: action.error, authenticating: false, currentUser: null }
    case actions.LOGOUT_SUCCESS:
      return { ...state, currentUser: null }
    case actions.NAVIGATE_TO:
      return { ...state, error: null }
    default:
      return state
  }
}
