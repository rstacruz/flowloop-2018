/* @flow */

/*::
  import type { FullTimer } from '../selectors/timer'

  type Props = {
    timer: FullTimer,
    color: string
  }
*/

import React from 'react'
import ms from '../helpers/timer_display'
import PieGraph from './pie_graph'

/**
 * The big round thing
 */

export default function TimerDisplay ({ timer, color } /*: Props */) {
  const { remaining, elapsed, isOvertime, laps, progress, duration } = timer

  return <div className='timer-display'>
    <PieGraph
      progress={1 - progress}
      steps={duration / 1000}
      color={color}
      className='pie _fade-in-slow' />
    { !isOvertime
      ? <span className='label'>{ms(remaining, true)}</span>
      : <span className='label -two-line'>
        <strong>×{laps}</strong>
        <small>{ms(elapsed)}</small>
      </span> }
  </div>
}
