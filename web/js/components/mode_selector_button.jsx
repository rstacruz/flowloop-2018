/* @flow */

/*::
  import type { Dispatch } from 'redux'
  import type { State } from '../selectors/state'
  import type { TimerMode } from '../selectors/settings'

  type Props = {
    mode: TimerMode,
    disabled: boolean,
    onOpen: () => void,
    onClose: () => void,
    onToggle: () => void
  }
*/

import React from 'react'
import c from 'classnames'
import { TIMER_MODE_LABELS } from '../selectors/settings'

export default class ModeSelectorButton extends React.PureComponent {
  /*:: props: Props */

  render () {
    const { mode, onToggle, disabled } = this.props

    return <button
      onClick={() => !disabled && onToggle()}
      disabled={disabled}
      aria-label={TIMER_MODE_LABELS[mode]}
      className={c('mode-selector-button', {
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
