/* @flow */

/*::
  import type { FullTimer } from '../selectors/timer'

  type Props = {
    timer: FullTimer
  }
*/

import React from 'react'
import ms from '../helpers/timer_display'

/**
 * The big round thing
 */

export default function TimerDisplay ({ timer } /*: Props */) {
  const { remaining, elapsed, isOvertime, laps } = timer

  return <div className='timer-display'>
    { !isOvertime
      ? <span className='label'>{ms(remaining, true)}</span>
      : <span className='label -two-line'>
        <strong>×{laps}</strong>
        <small>{ms(elapsed)}</small>
      </span> }
  </div>
}
