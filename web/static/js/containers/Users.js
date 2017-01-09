import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import FontIcon                        from 'material-ui/FontIcon'
import RaisedButton                    from 'material-ui/RaisedButton'
import { getUsers, showDialog }        from '../actions'
import UserList                        from './UserList'

class Users extends Component {
  static PropTypes = {
    dispatch: PropTypes.func.isRequired
  }

  onAddClick() {
    this.props.dispatch(showDialog.insertUser())
  }

  render() {
    return (
      <div>
        <div className='title-bar'>
          <div>Users</div>
          <div>
            <FontIcon onClick={::this.onAddClick}>
              <i className="material-icons icon-button">add_circle</i>
            </FontIcon>
          </div>
        </div>
        <UserList />
      </div>
    )
  }
}

export default connect()(Users)
