import React, { PropTypes }       from 'react'
import Dialog                     from 'material-ui/Dialog'
import RaisedButton               from 'material-ui/RaisedButton'
import { dialog }                 from '../styles/dialog'
import { button }                 from '../styles/forms'

const ConfirmationDialog = ({
  labelConfirm,
  labelDecline,
  onConfirm,
  onDecline,
  text
}) => (
  <Dialog open={true} contentStyle={dialog}>
    <div className='dialog__label'>{text}</div>
    <div className='dialog__buttons'>
      <RaisedButton
        label={labelConfirm}
        labelStyle={button.label}
        onClick={() => onConfirm()}
        primary={true}
        style={button.body}
      />
      <RaisedButton
        label={labelDecline}
        labelStyle={button.label}
        onClick={() => onDecline()}
        style={button.body}
      />
    </div>
  </Dialog>
)

ConfirmationDialog.propTypes = {
  labelConfirm: PropTypes.string.isRequired,
  labelDecline: PropTypes.string.isRequired,
  onConfirm   : PropTypes.func.isRequired,
  onDecline   : PropTypes.func.isRequired,
  text        : PropTypes.string.isRequired
}


export default ConfirmationDialog
