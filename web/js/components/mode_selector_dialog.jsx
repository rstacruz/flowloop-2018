/* @flow */

/*::
  import type { TimerMode } from '../selectors/settings'

  type Props = {
    onSelect: (mode: TimerMode) => void,
    selected: TimerMode
  }
*/

import React from 'react'

export default function ModeSelectorDialog (props /*: Props */) {
  const { onSelect } = props

  return <div className='mode-selector-dialog'>
    <button
      className='option mode-selector-option'
      onClick={() => { onSelect('CONTINUOUS') }}>
      <span className='icon' />
      <h2>Continuous mode</h2>
      <p>Continues indefinitely. Starts a new loop when one ends.</p>
    </button>
    <button
      className='option mode-selector-option'
      onClick={() => { onSelect('SINGLE') }}>
      <span className='icon' />
      <h2>Single mode</h2>
      <p>Continues indefinitely. Starts a new loop when one ends.</p>
    </button>
    <button
      className='option mode-selector-option'
      onClick={() => { onSelect('ALTERNATE') }}>
      <span className='icon' />
      <h2>Alternate mode</h2>
      <p>Continues indefinitely. Starts a new loop when one ends.</p>
    </button>
  </div>
}
