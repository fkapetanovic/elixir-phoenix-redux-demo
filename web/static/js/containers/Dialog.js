import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'
import DeleteJogDialog      from './DeleteJogDialog'
import DeleteUserDialog     from './DeleteUserDialog'
import InsertJogDialog      from '../components/InsertJogDialog'
import InsertUserDialog     from '../components/InsertUserDialog'
import UpdateJogDialog      from '../components/UpdateJogDialog'
import UpdateUserDialog     from '../components/UpdateUserDialog'
import * as constants       from '../actions/constants'

const Dialogs = {
  [constants.DIALOG_DELETE_JOG]: DeleteJogDialog,
  [constants.DIALOG_DELETE_USER]: DeleteUserDialog,
  [constants.DIALOG_INSERT_JOG]: InsertJogDialog,
  [constants.DIALOG_INSERT_USER]: InsertUserDialog,
  [constants.DIALOG_UPDATE_JOG]: UpdateJogDialog,
  [constants.DIALOG_UPDATE_USER]: UpdateUserDialog
}

const DialogRoot = ({ dialogProps, dialogType }) => {
  if (!dialogType) {
    return null
  }

  const Dialog = Dialogs[dialogType]

  return <Dialog {...dialogProps} />
}

DialogRoot.propTypes = {
  dialogProps: PropTypes.object,
  dialogType : PropTypes.string
}

export default connect(state => state.dialog)(DialogRoot)
