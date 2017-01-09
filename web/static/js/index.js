import React                    from 'react'
import ReactDOM                 from 'react-dom'
import { browserHistory }       from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root                     from './containers/Root'
import configureStore           from './store'
import rootSaga                 from './sagas'

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

store.runSaga(rootSaga)

const main = document.getElementById('root')
const root = <Root history={history} store={store} />

ReactDOM.render(root, main)
