import React            from 'react'
import Dialog           from 'material-ui/Dialog'
import { hideDialog }   from '../actions'
import InsertUserForm   from '../containers/InsertUserForm'
import { dialog }       from '../styles/dialog'

const InsertUserDialog = (props) => {
  return (
    <Dialog open={true} contentStyle={dialog}>
      <InsertUserForm onCancel={hideDialog} />
    </Dialog>
  )
}

export default InsertUserDialog
