import React from 'react'
import TimelineSummary from './timeline_summary'

class TimerLayout extends React.Component {
  render () {
    return <div className='timer-layout'>
      <div className='body'>
        {this.props.children}
      </div>

      <TimelineSummary />
    </div>
  }
}

export default TimerLayout
