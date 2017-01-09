import React, { PropTypes }   from 'react'
import Dialog                 from 'material-ui/Dialog'
import { hideDialog }         from '../actions'
import UpdateJogForm          from '../containers/UpdateJogForm'
import { dialog }             from '../styles/dialog'

const UpdateJogDialog = (props) => {
  return (
    <Dialog open={true} contentStyle={dialog}>
      <UpdateJogForm onCancel={hideDialog} jog={props.jog} userId={props.userId}/>
    </Dialog>
  )
}

UpdateJogDialog.propTypes = {
  jog   : PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default UpdateJogDialog
