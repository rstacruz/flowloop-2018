/* @flow */

/*::
  type Props = {
    className?: string,
    children?: React$Element<any>
  }
*/

import React from 'react'
import TimelineSummary from './timeline_summary'

class TimerLayout extends React.PureComponent {
  /*:: props: Props */

  render () {
    const { className, children } = this.props

    return <div className={`timer-layout ${className || ''}`}>
      <div className='topleft'>
        <a className='settings-button' href='#settings'>
          <span className='icon' />
        </a>
      </div>

      <div className='body'>{children}</div>

      <TimelineSummary className='fixed' />
    </div>
  }
}

export default TimerLayout
