import React, { Component, PropTypes }  from 'react'
import { connect }                      from 'react-redux'
import * as actions                     from '../actions/constants'
import RefreshIndicator                from 'material-ui/RefreshIndicator';

export function restricted(Component, allowedRoles = null) {
  class RestrictedRoute extends Component {
    static propTypes = {
      authenticating: PropTypes.bool.isRequired,
      currentUser   : PropTypes.object,
      dispatch      : PropTypes.func.isRequired
    }

    checkAuthentication() {
      if (!this.props.authenticating && !this.props.currentUser) {
        return false
      }

      return true
    }

    checkAuthorization() {
      const { currentUser } = this.props
      if (allowedRoles && currentUser && allowedRoles.indexOf(currentUser.role) === -1) {
        return false
      }

      return true
    }

    componentDidUpdate() {
      (!this.checkAuthentication() && this.props.dispatch({ type: actions.NOT_AUTHENTICATED })) ||
      (!this.checkAuthorization()  && this.props.dispatch({ type: actions.NOT_AUTHORIZED }))
    }

    render() {
      const style = {
        margin: 'auto',
        position: 'relative',
      }

      if (this.props.authenticating) {
        return (
          <RefreshIndicator
            size={50}
            left={0}
            top={150}
            status="loading"
            style={style}
          />
        )
      }

      if (this.props.currentUser) {
        return (
          <Component {...this.props}/>
        )
      }

      return null
    }
  }

  const mapStateToProps = (state) => ({
    authenticating: state.session.authenticating,
    currentUser   : state.session.currentUser
  })

  return connect(mapStateToProps)(RestrictedRoute)
}
