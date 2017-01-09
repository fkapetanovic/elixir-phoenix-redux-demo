import * as actions from '../actions/constants'

const initialState = {
  message: '',
  open   : false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.HIDE_SNACKBAR:
      return initialState
    case actions.SHOW_SNACKBAR:
      return { ...state, message: action.message, open: true }
    default:
      return state
  }
}
