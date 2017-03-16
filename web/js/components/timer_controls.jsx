import React from 'react'

import ModeSelector from '../components/mode_selector'
import LabelSelector from '../components/label_selector'
import ms from '../helpers/timer_display'

/**
 * Timer controls
 */

export default function TimerControls ({ now, timer }) {
  const { type, duration, label, elapsed } = timer
  const timerType = type

  return <div className='timer-controls'>
    <h1>
      {timerType === 'work'
        ? <LabelSelector label={label} />
        : <span>Break</span>}
    </h1>
    <p className='subtitle'>
      {ms(elapsed)}
      <span> of </span>
      {ms(duration)}
    </p>
    <div className='timer-spacer' />
    <p className='section'>
      <ModeSelector />
    </p>
  </div>
}
