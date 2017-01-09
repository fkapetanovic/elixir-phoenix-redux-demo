import React, { Component, PropTypes }   from 'react'
import { Field, reduxForm }              from 'redux-form'
import { TextField }                     from 'redux-form-material-ui'
import RaisedButton                      from 'material-ui/RaisedButton'
import { renderDatePicker }              from '../DatePicker'
import { button, input }                 from '../../styles/forms'

class JogForm extends Component {
  static propTypes = {
    actionName   : PropTypes.string.isRequired,
    error        : PropTypes.string,
    handleSubmit : PropTypes.func.isRequired,
    initialize   : PropTypes.func,
    initialValues: PropTypes.object,
    onCancel     : PropTypes.func,
    onSubmit     : PropTypes.func.isRequired,
    submitting   : PropTypes.bool.isRequired
  }

  componentWillMount() {
    const { initialize, initialValues } = this.props
    initialValues && initialize(initialValues)
  }

  render() {
    const { actionName, error, handleSubmit, onCancel, onSubmit, submitting} = this.props
    return (
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Field
          autoOk={true}
          component={renderDatePicker}
          mode='landscape'
          name='jog_date'
          style={input}
          text='Jog date'
        />
        <Field
          component={TextField}
          floatingLabelText='Distance (m)'
          name='distance'
          style={input}
          type='number'
        />
        <Field
          component={TextField}
          floatingLabelText='Hours'
          name='hours'
          style={input}
          type='number'
        />
        <Field
          component={TextField}
          floatingLabelText='Minutes'
          name='minutes'
          style={input}
          type='number'
        />
        <Field
          component={TextField}
          floatingLabelText='Seconds'
          name='seconds'
          style={input}
          type='number'
        />
        <div className='form__buttons'>
          <div>
            <RaisedButton
              disabled={submitting}
              label={actionName}
              labelStyle={button.label}
              primary={true}
              style={button.body}
              type='submit'
            />
            {onCancel &&
              <RaisedButton
                label='Cancel'
                labelStyle={button.label}
                onClick={() => onCancel()}
                style={button.body}
              />
            }
          </div>
        </div>
        {error && <div className='error'>{error}</div>}
      </form>
    )
  }
}

export default JogForm
