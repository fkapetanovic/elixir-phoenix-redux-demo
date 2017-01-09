import * as actions from '../actions/constants'

const initialState = {
  dialogType : null,
  dialogProps: {}
}

export default function dialog(state = initialState, action) {
  switch (action.type) {
    case actions.SHOW_DIALOG:
      return {
        dialogType: action.dialogType,
        dialogProps: action.dialogProps
      }
    case actions.HIDE_DIALOG:
      return initialState
    default:
      return state
  }
}
