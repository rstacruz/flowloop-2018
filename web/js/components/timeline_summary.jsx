import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import c from 'classnames'

class TimelineSummary extends React.Component {
  render () {
    console.log(this.props.log)

    return <div className="timeline-summary fixed">
      {values(this.props.log).map(item => {
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
    log: state.log
  }),
  dispatch => ({})
)(TimelineSummary)

export default TimelineSummary
