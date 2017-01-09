import React, { Component, PropTypes }  from 'react'
import { connect }                      from 'react-redux'
import * as actions                     from '../actions/constants'

export function anonymous(Component) {
  class AnonymousRoute extends Component {
    static propTypes = {
      currentUser: PropTypes.object,
      dispatch   : PropTypes.func.isRequired
    }

    componentDidUpdate() {
      this.props.currentUser && this.props.dispatch({ type: actions.NOT_ANONYMOUS })
    }

    componentDidMount() {
      this.props.currentUser && this.props.dispatch({ type: actions.NOT_ANONYMOUS })
    }

    render () {
      if (!this.props.currentUser) {
        return (
          <Component {...this.props}/>
        )
      }

      return null
    }
  }

  const mapStateToProps = (state) => ({
    currentUser: state.session.currentUser
  })

  return connect(mapStateToProps)(AnonymousRoute)
}
