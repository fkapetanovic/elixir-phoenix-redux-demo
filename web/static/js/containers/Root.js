import MuiThemeProvider             from 'material-ui/styles/MuiThemeProvider'
import React, { PropTypes }         from 'react'
import { Provider }                 from 'react-redux'
import { Router, RoutingContext }   from 'react-router'
import configRoutes                 from '../routes'
import RootDialog                   from './Dialog'

const Root = ({ history, store }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <div>
          <Router history={history} routes={configRoutes(store)}/>
          <RootDialog />
        </div>
      </MuiThemeProvider>
    </Provider>
  )
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store  : PropTypes.object.isRequired
}

export default Root
