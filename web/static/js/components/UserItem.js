import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import Restricted                      from '../containers/Restricted'
import FontIcon                        from 'material-ui/FontIcon'

export default class UserItem extends Component {
  static propTypes = {
    onDelete     : PropTypes.func.isRequired,
    onJogs      : PropTypes.func.isRequired,
    onUpdate     : PropTypes.func.isRequired,
    user         : PropTypes.shape({
      id         : PropTypes.number.isRequired,
      first_name : PropTypes.string.isRequired,
      last_name  : PropTypes.string.isRequired,
      email      : PropTypes.string.isRequired
    }).isRequired
  }

  onDeleteClick() {
    const { onDelete, user } = this.props
    onDelete(user.id)
  }

  onJogsClick() {
    const { onJogs, user } = this.props
    onJogs(user.id)
  }

  onUpdateClick() {
    const { onUpdate, user } = this.props
    onUpdate(user)
  }

  render() {
    const { first_name, last_name, email } = this.props.user

    return (
      <div>
        <div className='table__row'>
          <div>
            {first_name}
          </div>
          <div>
            {last_name}
          </div>
          <div>
            {email}
          </div>
          <div className='item-actions'>
            <Restricted allowedRoles={['admin']}>
              <FontIcon onClick={::this.onJogsClick}>
                <i className="material-icons icon-button icon-button--small">directions_run</i>
              </FontIcon>
            </Restricted>
            <FontIcon onClick={::this.onUpdateClick}>
              <i className="material-icons icon-button icon-button--small">mode_edit</i>
            </FontIcon>
            <FontIcon onClick={::this.onDeleteClick}>
              <i className="material-icons icon-button icon-button--small">close</i>
            </FontIcon>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}
