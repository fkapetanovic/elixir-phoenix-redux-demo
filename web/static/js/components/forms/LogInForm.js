import React, { Component, PropTypes } from 'react'
import { Field }                       from 'redux-form'
import { TextField }                   from 'redux-form-material-ui'
import RaisedButton                    from 'material-ui/RaisedButton'
import RefreshIndicator                from 'material-ui/RefreshIndicator'
import { button, input }               from '../../styles/forms'

export default class LogInForm extends Component {
  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    error         : PropTypes.string,
    handleSubmit  : PropTypes.func.isRequired,
    onSubmit      : PropTypes.func.isRequired
  }

  render() {
    const { authenticating, error, handleSubmit, onSubmit } = this.props

    const style = {
      margin: 'auto',
      position: 'relative',
    }

    if (authenticating) {
      return (
        <RefreshIndicator
          size={50}
          left={0}
          top={150}
          status="loading"
          style={style}
        />
      )
    }

    return (
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <Field
          component={TextField}
          floatingLabelText='Email'
          name='email'
          style={input}
          type='text'
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
            disabled={authenticating}
            label='Log In'
            labelStyle={button.label}
            primary={true}
            style={button.body}
            type='submit'
          />
        </div>
        {error && <div className='error'>{error}</div>}
      </form>
    )
  }
}
