import React, { PropTypes }    from 'react'
import Dialog                  from 'material-ui/Dialog'
import { hideDialog }          from '../actions'
import InsertJogForm           from '../containers/InsertJogForm'
import { dialog }              from '../styles/dialog'

const InsertJogDialog = ({ userId }) => (
  <Dialog open={true} contentStyle={dialog}>
    <InsertJogForm onCancel={hideDialog} userId={userId}/>
  </Dialog>
)

InsertJogDialog.propTypes = {
  userId: PropTypes.string.isRequired
}

export default InsertJogDialog
