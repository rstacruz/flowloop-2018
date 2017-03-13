import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import c from 'classnames'
import { recents } from '../log'

class TimelineSummary extends React.Component {
  render () {
    console.log('recents:', this.props.items)
    return <div className="timeline-summary fixed">
      {values(this.props.items).map(item => {
        return <span className={c('timeline-small-item', {
          '-break': item.timerType === 'break',
          '-work': item.timerType === 'work',
        })}>
          {item.label}
        </span>
      })}
    </div>
  }
}

TimelineSummary = connect(
  state => ({
    items: recents(state)
  }),
  dispatch => ({})
)(TimelineSummary)

export default TimelineSummary
