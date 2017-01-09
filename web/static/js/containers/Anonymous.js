import React, { PropTypes }     from 'react'
import { connect }              from 'react-redux'

const Anonymous = ({ authenticating, currentUser, children }) => {
  if (authenticating) return null

  if (!currentUser) {
    return children
  }

  return null
}

Anonymous.propTypes = {
  authenticating: PropTypes.bool.isRequired,
  children      : PropTypes.object,
  currentUser   : PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  currentUser   : state.session.currentUser,
  authenticating: state.session.authenticating
})


export default connect(mapStateToProps)(Anonymous)
