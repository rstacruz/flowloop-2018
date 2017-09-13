/* @flow */

/*::
  import type { Dispatch } from 'redux'
  import type { State } from '../selectors/state'
  import type { TimerMode } from '../selectors/settings'

  type Props = {
    mode: TimerMode,
    onSwitch: () => void,
    disabled: boolean
  }
*/

import React from 'react'
import Timer from '../selectors/timer'
import { connect } from 'react-redux'
import Settings from '../selectors/settings'
import ModeSelectorButton from './mode_selector_button'
import ModeSelectorDialog from './mode_selector_dialog'

/*
 * State manager
 */

class ModeSelector extends React.PureComponent {
  /*:: state: { open: boolean } */
  /*:: props: Props */

  constructor () {
    super()
    this.state = { open: false }
  }

  render () {
    const { props, state } = this
    const open = state.open && !props.disabled
    const { onSwitch } = props

    const onOpen = () => { this.setState({ open: true }) }
    const onClose = () => { this.setState({ open: false }) }
    const onToggle = () => { this.setState({ open: !open }) }

    return <span className='popup-set'>
      { open
        ? <span className='screen' onClick={onClose} />
        : null }
      { open
        ? <span className='dialog _pop-in' onClick={onClose}>
          <ModeSelectorDialog
            selected={props.mode}
            onSelect={(mode /*: TimerMode */) => { onClose(); onSwitch(mode) }} />
        </span>
        : null }
      <span className='trigger'>
        <ModeSelectorButton
          onOpen={onOpen}
          onClose={onClose}
          onToggle={onToggle}
          onSwitch={props.onSwitch}
          disabled={props.disabled}
          mode={props.mode}
          {...props} {...state} />
      </span>
    </span>
  }
}

/*
 * Redux
 */

export default connect(
  (state /*: State */) => ({
    mode: Settings.full(state)['timer:mode'],
    disabled: Timer.full(state).isOvertime
  }),
  (dispatch /*: Dispatch<*> */, ownProps) => ({
    onSwitch: (mode /*: TimerMode */) => {
      dispatch({ type: 'settings:update', payload: { 'timer:mode': mode } })
    }
  })
)(ModeSelector)
