/* @flow */

/*::
  import type { TimerMode } from '../selectors/settings'

  type Props = {
    onSelect: (mode: TimerMode) => void,
    selected: TimerMode
  }
*/

import React from 'react'
import c from 'classnames'

export default function ModeSelectorDialog (props /*: Props */) {
  const { onSelect, selected } = props

  return <div className='mode-selector-dialog'>
    <h1 className='heading'>
      Select a timer mode
    </h1>
    <div className='options'>
      <button
        className={c('option mode-selector-option', {
          '-active': selected === 'CONTINUOUS' })}
        onClick={() => { onSelect('CONTINUOUS') }}>
        <span className='icon -continuous' />
        <h2>Continuous</h2>
        <h5>Flow mode</h5>
        <p>Timers never end. Laps are recorded every time a timer completes.</p>
      </button>
      <button
        className={c('option mode-selector-option', {
          '-active': selected === 'SINGLE' })}
        onClick={() => { onSelect('SINGLE') }}>
        <span className='icon -single' />
        <h2>Single</h2>
        <h5>Pomodoro mode</h5>
        <p>Stops the timer after it completes. Works like classic Pomodoro.</p>
      </button>
      <button
        aria-label='Coming soon. Stay tuned!'
        disabled
        className={c('option mode-selector-option hint--bottom', {
          '-active': selected === 'ALTERNATE' })}
        onClick={() => { onSelect('ALTERNATE') }}>
        <span className='icon -alternate' />
        <h2>Alternating</h2>
        <h5>Pomodoro mode</h5>
        <p>Switches to a break after a work timer completes, and vice versa.</p>
      </button>
    </div>
  </div>
}
