import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'
import ConfirmationDialog   from '../components/ConfirmationDialog'
import { hideDialog }       from '../actions'
import { dataRequest }      from '../actions'
import * as actions         from '../actions/constants'

const mapStateToProps = (state, ownProps) => ({
  labelConfirm: 'Yes',
  labelDecline: 'No',
  text        : 'Are you sure?'
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onConfirm: () => {
      dispatch(dataRequest({
        requestName: actions.DELETE_JOG,
        successMsg : 'Jog deleted.',
        data: {
          jogId:  ownProps.jogId,
          userId: ownProps.userId
        }
      }))
    },
    onDecline: () => {
      dispatch(hideDialog())
    }
  }
}

const DeleteJogDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationDialog)

export default DeleteJogDialog
