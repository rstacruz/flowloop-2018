/* @flow */

/*::
  type Props = {
    className?: string,
    children?: React$Element<any>
  }
*/

import React from 'react'
import TimelineSummary from './timeline_summary'

class TimerLayout extends React.Component {
  /*:: props: Props */

  render () {
    return <div className={`timer-layout ${this.props.className || ''}`}>
      <div className='body'>
        {this.props.children}
      </div>

      <TimelineSummary />
    </div>
  }
}

export default TimerLayout
