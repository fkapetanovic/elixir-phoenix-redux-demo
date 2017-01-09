import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import FontIcon                        from 'material-ui/FontIcon'

export default class JogItem extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    userId  : PropTypes.string.isRequired,
    jog    : PropTypes.shape({
      distance : PropTypes.number.isRequired,
      hours    : PropTypes.number.isRequired,
      id       : PropTypes.number.isRequired,
      jog_date : PropTypes.string.isRequired,
      minutes  : PropTypes.number.isRequired,
      seconds  : PropTypes.number.isRequired
    }).isRequired
  }

  onDeleteClick() {
    const { onDelete, userId, jog } = this.props

    onDelete(userId, jog.id)
  }

  onUpdateClick() {
    const { onUpdate, userId, jog} = this.props
    onUpdate(userId, jog)
  }

  render() {
    const { jog_date, distance, hours, minutes, seconds, seconds_total } = this.props.jog

    return (
      <div>
        <div className='table__row'>
          <div>
            {jog_date}
          </div>
          <div>
            {distance}m
          </div>
          <div>
            {`${hours}h:${minutes}m:${seconds}s`}
          </div>
          <div>
            {(distance * 3.6 / seconds_total).toFixed(2)} km/h
          </div>
          <div className='item-actions'>
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
