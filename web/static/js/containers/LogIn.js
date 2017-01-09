import React                 from 'react'
import { connect }           from 'react-redux'
import { reduxForm }         from 'redux-form'
import LogInForm             from '../components/forms/LogInForm'
import { validateLogIn }     from '../components/forms/validations'
import { login }             from '../actions'
import * as actions          from '../actions/constants'

const mapStateToProps = state => ({
  authenticating: state.session.authenticating,
  error         : state.session.error,
  currentUser   : state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (credentials) => {
    dispatch(
      login({
        data: {
          session: credentials
        }
      }
    ))
  }
})

export default reduxForm({
  form: 'LogInForm',
  validate: validateLogIn
})(connect(mapStateToProps, mapDispatchToProps)(LogInForm))
