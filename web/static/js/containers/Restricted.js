import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'

const Restricted = ({ allowedRoles, children, currentUser }) => {
  if (!currentUser) {
    return null
  }

  if (allowedRoles && allowedRoles.indexOf(currentUser.role) === -1) {
    return null
  }

  return children
}

Restricted.propTypes = {
  allowedRoles: PropTypes.array,
  children    : PropTypes.object,
  currentUser : PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  allowedRoles: ownProps.allowedRoles,
  currentUser : state.session.currentUser
})

export default connect(mapStateToProps)(Restricted)
