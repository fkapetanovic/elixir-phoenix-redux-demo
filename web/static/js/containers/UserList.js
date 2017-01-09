import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import IconButton                      from 'material-ui/IconButton'
import UserItem                        from '../components/UserItem'
import * as actions                    from '../actions/constants'

import {
  dataRequest,
  getUsers,
  navigateTo,
  showDialog
} from '../actions'

class UserList extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, user: { users } } = this.props
    if (users.length < 1) {
      dispatch(dataRequest({ requestName: actions.GET_USERS }))
    }
  }

  onDelete() {
    const { dispatch } = this.props

    return (userId) => {
      dispatch(showDialog.deleteUser({ userId: userId }))
    }
  }

  onJogs() {
    const { dispatch } = this.props

    return (userId) => {
      dispatch(navigateTo(`/users/${userId}/jogs`))
    }
  }

  onUpdate() {
    const { dispatch } = this.props

    return (user) => {
      dispatch(showDialog.updateUser({ user: user }))
    }
  }

  renderUsers(users) {
    return (
      users.map((user) => {
        return (
          <UserItem
            key={user.id}
            onDelete={::this.onDelete()}
            onJogs={::this.onJogs()}
            onUpdate={::this.onUpdate()}
            user={user}
          />
        );
      })
    )
  }

  render() {
    const { user: { loading, users } } = this.props

    if (loading) return null

    return (
      <div id='user-table'>
        <div className='table__row table__header'>
          <div>
            First Name
          </div>
          <div>
            Last Name
          </div>
          <div>
            E-mail
          </div>
          <div>
           &nbsp;
          </div>
        </div>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default connect(state => ({ user: state.user }))(UserList)
