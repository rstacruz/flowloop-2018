import React from 'react'
import c from 'classnames'
import { TIMER_MODE_LABELS } from '../selectors/settings'
import Settings from '../selectors/settings'
import { connect } from 'react-redux'

class ModeSelector extends React.Component {
  render () {
    const { mode } = this.props

    return <button className={c('mode-selector', {
      '-single': mode === 'SINGLE',
      '-continuous': mode === 'CONTINUOUS',
      '-alternate': mode === 'ALTERNATE',
    })}>
      <span className="icon" />
      <span className="label">{TIMER_MODE_LABELS[mode]}</span>
    </button>
  }
}

ModeSelector = connect(
  state => ({
    mode: Settings.full(state)['timer:mode']
  }),
  dispatch => ({})
)(ModeSelector)

export default ModeSelector
