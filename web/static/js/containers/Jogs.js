import React, { Component, PropTypes }   from 'react'
import { connect }                       from 'react-redux'
import { routerActions }                 from 'react-router-redux'
import { Field, reduxForm }              from 'redux-form'
import moment                            from 'moment'
import RaisedButton                      from 'material-ui/RaisedButton'
import FontIcon                          from 'material-ui/FontIcon'
import JogList                           from './JogList'
import DatePicker                        from '../components/DatePicker'
import * as actions                      from '../actions/constants'
import { datePicker }                    from '../styles/forms'

import {
  dataRequest,
  filterChanged,
  navigateTo,
  showDialog
} from '../actions'

class Jogs extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    userId  : PropTypes.string.isRequired,
    jog     : PropTypes.shape({
      error : PropTypes.string,
      filter: PropTypes.object.isRequired
    }).isRequired
  }

  onAddClick() {
    this.props.dispatch(showDialog.insertJog({
      userId: this.props.userId
    }))
  }

  onChangeDate(key) {
    return (value) => {
      let filter = {}
      filter[key] = moment(value).format('YYYY-MM-DD')

      this.props.dispatch(filterChanged({ data: filter }))
    }
  }

  onClearClick() {
    const { dispatch, userId } = this.props

    dispatch(filterChanged({
      data: {
        start_date: null,
        end_date: null
      }
    }))

    dispatch(
      dataRequest({
        requestName: actions.GET_JOGS,
        data       : {
          userId: userId,
        }
      })
    )
  }

  onReportClick() {
    this.props.dispatch(navigateTo(`/users/${this.props.userId}/jogs/report`))
  }

  onSearchClick() {
    const { dispatch, jog: { filter }, userId } = this.props

    this.props.dispatch(
      dataRequest({
        requestName: actions.SEARCH_JOGS,
        data       : {
          userId: userId,
          filter: filter
        }
      })
    )
  }

  render() {
    const { jog: { error, filter }, userId } = this.props

    return (
      <div style={{ width: '100%'}}>
        <div className='search-bar'>
          <DatePicker
            labelText='Start Date'
            onChangeDate={::this.onChangeDate('start_date')}
            style={datePicker}
            value={filter.start_date}
          />
          <DatePicker
            labelText='End Date'
            onChangeDate={::this.onChangeDate('end_date')}
            style={datePicker}
            value={filter.end_date}
          />
          {(filter.start_date || filter.end_date) &&
          <FontIcon onClick={::this.onSearchClick}>
            <i className="material-icons icon-button">search</i>
          </FontIcon>
          }
          {(filter.start_date || filter.end_date) &&
          <FontIcon onClick={::this.onClearClick}>
            <i className="material-icons icon-button">close</i>
          </FontIcon>
          }
        </div>
        {error && <div className='error'>{error}</div>}
        <div className='title-bar'>
          <div>Jogs</div>
          <div>
            <FontIcon onClick={::this.onAddClick}>
              <i className="material-icons icon-button">add_circle</i>
            </FontIcon>
            <FontIcon onClick={::this.onReportClick}>
              <i className="material-icons icon-button">format_list_numbered</i>
            </FontIcon>
          </div>
        </div>
        <JogList userId={userId}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  jog   : state.jog,
  userId: ownProps.params.id
})

export default connect(mapStateToProps)(Jogs)
