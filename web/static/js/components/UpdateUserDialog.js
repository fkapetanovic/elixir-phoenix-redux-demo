import React, { PropTypes }   from 'react'
import Dialog                 from 'material-ui/Dialog'
import { hideDialog }         from '../actions'
import UpdateUserForm         from '../containers/UpdateUserForm'
import { dialog }             from '../styles/dialog'

const UpdateUserDialog = (props) => {
  return (
    <Dialog open={true} contentStyle={dialog}>
      <UpdateUserForm onCancel={hideDialog} user={props.user}/>
    </Dialog>
  )
}

UpdateUserDialog.propTypes = {
  user  : PropTypes.object.isRequired
}

export default UpdateUserDialog
