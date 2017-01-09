import { reduxForm }          from 'redux-form'
import { connect }            from 'react-redux'
import UserForm               from '../components/forms/UserForm'
import { validateUserInsert } from '../components/forms/validations'
import { dataRequest }        from '../actions'
import * as actions           from '../actions/constants'

const mapStateToProps = (state, ownProps) => ({
  actionName: 'Add',
  error     : state.user.error,
  submitting: state.user.submitting
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (user) => { dispatch(
      dataRequest({
        requestName: actions.INSERT_USER,
        successMsg : 'User added.',
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
  validate: validateUserInsert})(connect(mapStateToProps, mapDispatchToProps)(UserForm))
