import { PropTypes }          from 'react'
import { reduxForm }          from 'redux-form'
import { connect }            from 'react-redux'
import moment                 from 'moment'
import JogForm                from '../components/forms/JogForm'
import { validateJogInsert }  from '../components/forms/validations'
import { dataRequest }        from '../actions'
import * as actions           from '../actions/constants'

const mapStateToProps = (state, ownProps) => ({
  actionName: 'Add',
  error     : state.jog.error,
  submitting: state.jog.submitting,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (jog) => {
      jog.jog_date = moment(jog.jog_date).format('YYYY-MM-DD')
      dispatch(
        dataRequest({
          requestName: actions.INSERT_JOG,
          successMsg : 'Jog added.',
          data: {
            jog   : jog,
            userId: ownProps.userId
          }
        }
      ))
    },
    onCancel: () => {
      dispatch(ownProps.onCancel())
    }
  }
}

export default reduxForm({
  form: 'JogForm',
  validate: validateJogInsert})(connect(mapStateToProps, mapDispatchToProps)(JogForm))
