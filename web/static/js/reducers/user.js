import * as actions from '../actions/constants'

const initialState = {
  error     : null,
  loading   : false,
  submitting: false,
  users     : []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.DELETE_USER:
      return { ...state }
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.response.user.id)

      }
    case actions.DELETE_USER_FAILURE:
      return { ...state, error: action.error }
    case actions.GET_USERS:
      return { ...state, loading: true }
    case actions.GET_USERS_SUCCESS:
      return { ...state, error: null, loading: false, users: action.response.users }
    case actions.GET_USERS_FAILURE:
      return { ...state, error: action.error, loading: false, users: [] }
    case actions.HIDE_DIALOG:
      return { ...state, error: null }
    case actions.INSERT_USER:
      return { ...state, submitting: true }
    case actions.INSERT_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.response.user],
        submitting: false
      }
    case actions.INSERT_USER_FAILURE:
      return { ...state, error: action.error, submitting: false}
    case actions.UPDATE_USER:
      return { ...state, submitting: true }
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.response.user.id) {
            return action.response.user
          }
          return user
        }),
        submitting: false
      }
    case actions.UPDATE_USER_FAILURE:
      return { ...state, error: action.error, submitting: false }
    default:
      return state;
  }
}
