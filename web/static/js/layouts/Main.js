import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux'
import Snackbar                         from 'material-ui/Snackbar'
import Navigation                       from '../containers/Navigation'

class MainLayout extends Component {
  constructor() {
    super();
  }

  render() {
    const { children, handleRequestClose, snackbarMessage, snackbarOpen } = this.props

    return (
      <div id='main'>
        <Navigation id='navigation'/>
        <div id='content'>
          {children}
        </div>
        <Snackbar
          autoHideDuration={2000}
          message={snackbarMessage}
          onRequestClose={handleRequestClose}
          open={snackbarOpen}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  snackbarMessage: state.snackbar.message,
  snackbarOpen: state.snackbar.open
})

const mapDispatchToProps = (dispatch) => ({
  handleRequestClose: () => {
    dispatch({type: 'HIDE_SNACKBAR'})
  }
})

const Main = connect(mapStateToProps, mapDispatchToProps)(MainLayout)

Main.propTypes = {
  children          : PropTypes.object.isRequired,
  handleRequestClose: PropTypes.func,
  snackbarMessage   : PropTypes.string,
  snackbarOpen      : PropTypes.bool
}

export default Main
