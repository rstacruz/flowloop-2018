/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { FullTimer } from '../selectors/timer'

  type Props = {
    now: Date,
    timer: FullTimer,
    onLabelSelect: () => void
  }
*/

import React from 'react'
import ModeSelector from '../components/mode_selector'
import LabelSelector from '../components/label_selector'
import ms from '../helpers/timer_display'
import { connect } from 'react-redux'

/**
 * Timer controls
 */

export function TimerControls ({ now, timer, onLabelSelect } /*: Props */) {
  const { type, duration, label, elapsed } = timer
  const timerType = type

  return <div className='timer-controls'>
    <h1>
      {timerType === 'work'
        ? <LabelSelector
            label={label}
            selectedId={'_default'}
            onSelect={onLabelSelect} />
        : <span>Break</span>}
    </h1>
    <p className='subtitle'>
      {ms(elapsed)}
      <span> of </span>
      {ms(duration)}
    </p>
    <div className='timer-spacer -small' />
    <p className='section'>
      <ModeSelector />
    </p>
  </div>
}

/*
 * Redux
 */

export default connect(
  (state /*: State */) => ({
    labelId: state.timer.labelId
  }),
  (dispatch /*: Dispatch<*> */) => ({
    onLabelSelect: () => { /* TODO */ }
  })
)(TimerControls)
