import React, { PropTypes }         from 'react'
import { connect }                  from 'react-redux'
import FlatButton                   from 'material-ui/RaisedButton'
import Anonymous                    from './Anonymous'
import Restricted                   from './Restricted'
import { dataRequest, navigateTo }  from '../actions'
import * as actions                 from '../actions/constants'
import { button, bar }              from '../styles/navigation'

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'

class Navigation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { dispatch, userId } = this.props

    return (
      <Toolbar style={ bar.body }>
        <ToolbarGroup className='navigation' style={bar.menu}>
          <ToolbarTitle
            onClick={() => dispatch(navigateTo(`/`))}
            style={button.home}
            text='Joggernaut'
          />
          <div className='navigation__menu'>
            <Restricted allowedRoles={['admin', 'user_manager']}>
              <div
                className='navigation__link'
                onClick={() => dispatch(navigateTo(`/users/`))}
              >
                Users
              </div>
            </Restricted>
            <Restricted allowedRoles={['regular']}>
              <div
                className='navigation__link'
                onClick={() => dispatch(navigateTo(`/users/${userId}/jogs`))}
              >
                My Jogs
              </div>
            </Restricted>
            <Anonymous>
              <div
                className='navigation__link'
                onClick={() => dispatch(navigateTo('/login'))}
              >
                Log In
              </div>
            </Anonymous>
            <Anonymous>
              <FlatButton
                label='Register'
                labelStyle={button.label}
                onClick={() => dispatch(navigateTo('/register'))}
                primary={true}
                style={button.body}
              />
            </Anonymous>
            <Restricted>
              <div
                className='navigation__link'
                onClick={() => dispatch(dataRequest({ requestName: actions.LOGOUT }))}
              >
                Log Out
              </div>
            </Restricted>
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.session.currentUser
  return {
    userId: currentUser ? currentUser.id : 0
  }
}

export default connect(mapStateToProps)(Navigation)
