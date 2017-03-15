import React from 'react'
import ms from '../helpers/timer_display'

/**
 * The big round thing
 */

export default function TimerDisplay ({ timer }) {
  const { remaining } = timer

  return <div className="timer-display">
    <span className="label">{ms(remaining, true)}</span>
  </div>
}
