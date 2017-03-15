import React from 'react'
import ms from '../helpers/timer_display'

/**
 * The big round thing
 */

export default function TimerDisplay ({ timer }) {
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
