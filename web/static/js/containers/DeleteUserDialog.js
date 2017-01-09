import { PropTypes }        from 'react'
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
        requestName: actions.DELETE_USER,
        successMsg : 'User deleted.',
        data: {
          userId: ownProps.userId
        }
      }))
    },
    onDecline: () => {
      dispatch(hideDialog())
    }
  }
}

const DeleteUserDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationDialog)

export default DeleteUserDialog
