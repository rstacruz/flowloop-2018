import React from 'react'

class TimerLayout extends React.Component {
  render () {
    return <div className="timer-layout">
      <div className="body">
        {this.props.children}
      </div>

      <div className="timeline-summary fixed">
        Nothing logged today
      </div>
    </div>
  }
}

export default TimerLayout
