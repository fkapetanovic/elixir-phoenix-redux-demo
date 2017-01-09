import React, { Component, PropTypes }  from 'react'
import { connect }                      from 'react-redux'
import JogItem                          from '../components/JogItem'
import { dataRequest, showDialog }      from '../actions'
import * as actions                     from '../actions/constants'

class JogList extends Component {
  static propTypes = {
    jog: PropTypes.object.isRequired
  }

  componentWillMount() {
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

  onDelete() {
    const { dispatch } = this.props

    return (userId, jogId) => {
      dispatch(
        showDialog.deleteJog({
          userId: userId,
          jogId : jogId
        }
      ))
    }
  }

  onUpdate() {
    const { dispatch } = this.props

    return (userId, jog) => {
      dispatch(showDialog.updateJog({
        jog   : jog,
        userId: userId
      }))
    }
  }

  renderJogs(jogs) {
    const { userId } = this.props
    return (
      jogs.map((jog) => {
        return (
          <JogItem
            key={jog.id}
            onDelete={::this.onDelete()}
            onUpdate={::this.onUpdate()}
            jog={jog}
            userId={userId}
          />
        );
      })
    )
  }

  render() {
    const { jog: { jogs, loading } } = this.props

    if (loading) return null

    if (jogs.length === 0) {
      return <div className='message'>Click the "+" button to add new items.</div>
    }

    return (
      <div id='jog-table' className='table'>
        <div className='table__row table__header'>
          <div>
            Date
          </div>
          <div>
            Distance
          </div>
          <div>
            Time
          </div>
          <div>
            Speed
          </div>
          <div>
           &nbsp;
          </div>
        </div>
        <div>{this.renderJogs(jogs)}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  jog: state.jog
})

export default connect(mapStateToProps)(JogList)
