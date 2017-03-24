/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { FullTimer } from '../selectors/timer'

  type Props = {
    now: Date,
    timer: FullTimer
  }
*/

import React from 'react'
import ModeSelector from '../components/mode_selector'
import LabelSelector from '../components/label_selector'
import ms from '../helpers/timer_display'

/**
 * Timer controls
 */

export default function TimerControls ({ now, timer } /*: Props */) {
  const { type, duration, elapsed } = timer
  const timerType = type

  return <div className='timer-controls'>
    <div className='title'>
      <h1 className={timerType === 'work' ? '-work' : ''}>
        {timerType === 'work'
          ? <LabelSelector />
          : <span>Break</span>}
      </h1>
      <p className='subtitle'>
        {ms(elapsed)}
        <span> of </span>
        {ms(duration)}
      </p>
    </div>
    <p className='actions'>
      <ModeSelector />
    </p>
  </div>
}
