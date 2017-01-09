import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import { reduxForm }            from 'redux-form'
import UserForm                 from '../components/forms/UserForm'
import { validateUserInsert }   from '../components/forms/validations'
import { register }             from '../actions'
import * as actions             from '../actions/constants'

const mapStateToProps = state => ({
  actionName    : 'Register',
  authenticating: state.session.authenticating,
  error         : state.session.error
})


const mapDispatchToProps = dispatch => ({
  onSubmit: (user) => {
    dispatch(
      register({
        data: {
          user: user
        }
      }
    ))
  }
})

export default reduxForm({
  form: 'RegisterForm',
  validate: validateUserInsert
})(connect(mapStateToProps, mapDispatchToProps)(UserForm))
