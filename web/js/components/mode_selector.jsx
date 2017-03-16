/* @flow */

/*::
  import type { TimerMode } from '../selectors/settings'

  type Props = {
    mode: TimerMode,
    onSwitch: () => void,
    disabled: boolean
  }
*/

import React from 'react'
import c from 'classnames'
import Settings, { TIMER_MODE_LABELS } from '../selectors/settings'
import Timer from '../selectors/timer'
import { connect } from 'react-redux'

export class ModeSelector extends React.Component {
  /*:: props: Props */

  render () {
    const { mode, onSwitch, disabled } = this.props

    return <button
      onClick={() => !disabled && onSwitch()}
      disabled={disabled}
      aria-label={TIMER_MODE_LABELS[mode]}
      className={c('mode-selector', {
        'hint--bottom': true,
        '-single': mode === 'SINGLE',
        '-continuous': mode === 'CONTINUOUS',
        '-alternate': mode === 'ALTERNATE'
      })}>
      <span className='icon' />
      {/* <span className="label">{TIMER_MODE_LABELS[mode]}</span> */}
    </button>
  }
}

/*
 * Redux
 */

export default connect(
  state => ({
    mode: Settings.full(state)['timer:mode'],
    disabled: Timer.full(state).isOvertime
  }),
  dispatch => ({
    onSwitch: () => {
      dispatch({ type: 'settings:cycleTimerMode' })
    }
  })
)(ModeSelector)
