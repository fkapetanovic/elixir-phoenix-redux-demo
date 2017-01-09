import React, { Component, PropTypes }   from 'react'
import { connect }                       from 'react-redux'
import { dataRequest }                   from '../actions'
import * as actions                      from '../actions/constants'

class JogReport extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { filter, userId } = this.props

    this.props.dispatch(dataRequest({
      requestName: actions.JOGS_REPORT,
      data       : {
        filter: filter,
        userId: userId
      }
    }))
  }

  render() {
    const { report, loading } = this.props

    if (loading) return null

    report.sort((a, b) => { return b.year - a.year || b.week - a.week })

    return (
      <div id='report'>
        <div className='table__row table__header'>
          <div>Week</div>
          <div>Distance</div>
          <div>Speed</div>
        </div>
        {
          report.map((weeklyReport) => {
            let { week, year, distance, time } = weeklyReport
            let speed = (distance * 3.6 / time).toFixed(2)
            week = `${week} (${year})`

            return (
              <div className='table__row' key={week}>
                <div>{week}</div>
                <div>{distance}m</div>
                <div>{speed} km/h</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  filter : state.jog.filter,
  loading: state.jog.loading,
  report : state.jog.report,
  userId : ownProps.params.id
})

export default connect(mapStateToProps)(JogReport)
