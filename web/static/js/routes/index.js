import { Route, IndexRoute }  from 'react-router'
import React                  from 'react'
import MainLayout             from '../layouts/Main'
import Home                   from '../components/Home'
import NotFound               from '../components/NotFound'
import { restricted }         from '../containers/RestrictedRoute'
import { anonymous }          from '../containers/AnonymousRoute'
import JogReport              from '../containers/JogReport'
import LogIn                  from '../containers/LogIn'
import Register               from '../containers/Register'
import Jogs                   from '../containers/Jogs'
import Users                  from '../containers/Users'
import { dataRequest }        from '../actions'
import * as actions           from '../actions/constants'

export default function configRoutes(store) {
  const authenticate = (nextState, replace, callback) => {
    const { dispatch } = store
    const { session: { currentUser } } = store.getState()

    if (!currentUser) {
      dispatch(dataRequest({ requestName: actions.GET_CURRENTUSER }))
    }

    callback()
  }

  return (
    <Route component={MainLayout} onEnter={authenticate}>
      <Route path="/login" component={anonymous(LogIn)}/>
      <Route path="/register" component={anonymous(Register)}/>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/users" component={restricted(Users, ['admin', 'user_manager'])} />
        <Route path="/users/:id/jogs/report" component={restricted(JogReport, ['admin', 'regular'])} />
        <Route path="/users/:id/jogs" component={restricted(Jogs, ['admin', 'regular'])} />
        <Route path='*' component={NotFound} />
      </Route>
    </Route>
  )
}
