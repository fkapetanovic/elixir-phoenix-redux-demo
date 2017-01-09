import React, { Component, PropTypes }   from 'react'
import { Field }                         from 'redux-form'
import { TextField }                     from 'redux-form-material-ui'
import RaisedButton                      from 'material-ui/RaisedButton'
import { button, input }                 from '../../styles/forms'

class UserForm extends Component {
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

  componentDidMount() {
    const { initialize, initialValues } = this.props
    initialValues && initialize(initialValues)
  }

  render() {
    const { actionName, error, handleSubmit, onCancel, onSubmit, submitting} = this.props

    return (
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={TextField}
          floatingLabelText='First name'
          name='first_name'
          style={input}
        />
        <Field
          component={TextField}
          floatingLabelText='Last name'
          name='last_name'
          style={input}
        />
        <Field
          component={TextField}
          floatingLabelText='Email'
          name='email'
          style={input}
        />
        <Field
          component={TextField}
          floatingLabelText='Password'
          name='password'
          style={input}
          type='password'
        />
        <div className='form__buttons'>
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
        {error && <div className='error'>{error}</div>}
      </form>
    )
  }
}

export default UserForm
