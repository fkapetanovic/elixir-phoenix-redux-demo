import * as constants from './constants'

const action = (type, payload = {}) => ({
  type, ...payload
})

export const dataRequest = ({ data, ...params }) => ({
  data: data,
  type: constants.DATA_REQUEST,
  ...params
})

export const filterChanged = data => action(constants.FILTER_CHANGED, data)

export const hideDialog = () => action(constants.HIDE_DIALOG)

export const login = data => action(constants.LOGIN, data)

export const navigateTo = path => action(constants.NAVIGATE_TO, { path })

export const register = data => action(constants.REGISTER, data)

export const showDialog = {
  deleteJog : (dialogProps) => action(constants.SHOW_DIALOG, {dialogType: constants.DIALOG_DELETE_JOG, dialogProps}),
  deleteUser: (dialogProps) => action(constants.SHOW_DIALOG, {dialogType: constants.DIALOG_DELETE_USER, dialogProps}),
  insertJog : (dialogProps) => action(constants.SHOW_DIALOG, {dialogType: constants.DIALOG_INSERT_JOG, dialogProps}),
  insertUser: (dialogProps) => action(constants.SHOW_DIALOG, {dialogType: constants.DIALOG_INSERT_USER, dialogProps}),
  updateJog : (dialogProps) => action(constants.SHOW_DIALOG, {dialogType: constants.DIALOG_UPDATE_JOG, dialogProps}),
  updateUser: (dialogProps) => action(constants.SHOW_DIALOG, {dialogType: constants.DIALOG_UPDATE_USER, dialogProps}),
}

export const showSnackbar = message => action(constants.SHOW_SNACKBAR, { message })
