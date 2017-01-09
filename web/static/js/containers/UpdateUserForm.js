import { connect }            from 'react-redux'
import { reduxForm }          from 'redux-form'
import UserForm               from '../components/forms/UserForm'
import { validateUserUpdate } from '../components/forms/validations'
import { dataRequest }        from '../actions'
import * as actions           from '../actions/constants'

const mapStateToProps = (state, ownProps) => ({
  actionName   : 'Update',
  error        : state.user.error,
  initialValues: ownProps.user,
  submitting   : state.user.submitting,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (user) => {
      dispatch(dataRequest({
        requestName: actions.UPDATE_USER,
        successMsg : 'User updated.',
        data: {
          user: user
        }
      }))
    },
    onCancel: () => {
      dispatch(ownProps.onCancel())
    }
  }
}

export default reduxForm({
  form: 'UserForm',
  validate: validateUserUpdate})(connect(mapStateToProps, mapDispatchToProps)(UserForm))
