/* @flow */

import React from 'react'
import c from 'classnames'
import { TIMER_MODE_LABELS } from '../selectors/settings'

import type { TimerMode } from '../selectors/settings'

type Props = {
  mode: TimerMode,
  disabled: boolean,
  // onOpen: () => void,
  // onClose: () => void,
  onToggle: () => void
}

export default class ModeSelectorButton extends React.PureComponent {
  props: Props

  render () {
    const { mode, onToggle, disabled } = this.props
    const label = TIMER_MODE_LABELS[mode]

    return (
      <button
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        aria-label={label}
        className={buttonClass(mode)}
      >
        <span className='icon' />
        {/* <span className="label">{label}</span> */}
      </button>
    )
  }
}

/**
 * Returns the class name for the button
 * @param {TimerMode} mode Mode
 */

function buttonClass (mode: TimerMode) {
  return c('mode-selector-button', {
    'hint--bottom': true,
    '-single': mode === 'SINGLE',
    '-continuous': mode === 'CONTINUOUS',
    '-alternate': mode === 'ALTERNATE'
  })
}
