import React from 'react'
import c from 'classnames'
import Settings, { TIMER_MODE_LABELS } from '../selectors/settings'
import { connect } from 'react-redux'

export class ModeSelector extends React.Component {
  render () {
    const { mode, onSwitch } = this.props

    return <button
      onClick={() => onSwitch()}
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

export default connect(
  state => ({
    mode: Settings.full(state)['timer:mode']
  }),
  dispatch => ({
    onSwitch: () => {
      dispatch({ type: 'settings:cycleTimerMode' })
    }
  })
)(ModeSelector)
