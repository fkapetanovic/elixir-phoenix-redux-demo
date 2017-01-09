import React, { PropTypes } from 'react'
import DatePicker           from 'material-ui/DatePicker'
import moment               from 'moment'

export const renderDatePicker = ({
  autoOk,
  input,
  meta: { touched, error },
  mode,
  style,
  text
}) => (
  <DatePicker
    autoOk={autoOk}
    errorText={touched && error}
    floatingLabelText={text}
    {...input}
    mode={mode && mode}
    onChange={(event, value) => { input.onChange(value)  }}
    textFieldStyle={style}
    value ={input.value !== '' ? new Date(input.value) : null}
  />
)

renderDatePicker.propTypes = {
  autoOk   : PropTypes.bool.isRequired,
  input    : PropTypes.object.isRequired,
  meta     : PropTypes.object.isRequired,
  mode     : PropTypes.string.isRequired,
  style    : PropTypes.object,
  text     : PropTypes.string.isRequired
}

export default class MaterialDatePicker extends React.Component {
  static propTypes = {
    labelText   : PropTypes.string.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    style       : PropTypes.object,
    value       : PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  onChangeDate = (e, date) => {
    this.props.onChangeDate(date)
  }

  render() {
    const { labelText, value, style } = this.props

    return (
      <DatePicker
        autoOk={true}
        floatingLabelText={this.props.labelText}
        onChange={::this.onChangeDate}
        style={style.body}
        textFieldStyle={style.input}
        value={value && new Date(value)}
      />
    )
  }
}
