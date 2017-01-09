import 'babel-polyfill'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware }             from 'react-router-redux'
import createLogger                     from 'redux-logger'
import createSagaMiddleware             from 'redux-saga'
import injectTapEventPlugin             from 'react-tap-event-plugin';
import rootReducer                      from '../reducers'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
})

export default function configureStore(browserHistory) {
  injectTapEventPlugin()
  
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const sagaMiddleware = createSagaMiddleware()

  return {
    ...createStore(rootReducer, applyMiddleware(loggerMiddleware,reduxRouterMiddleware, sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}
