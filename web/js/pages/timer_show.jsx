import React from 'react'
import Title from 'react-document-title'
import get from '101/pluck'
import { connect } from 'react-redux'

import TimerBlank from '../components/timer_blank'
import TimerLayout from '../components/timer_layout'
import TimerControls from '../components/timer_controls'
import TimerDisplay from '../components/timer_display'
import Timer from '../selectors/timer'
import ms from '../helpers/timer_display'

export class TimerShow extends React.Component {
  render () {
    if (!this.props.timer.active) {
      return <TimerBlank {...this.props} />
    }

    const { timer } = this.props
    const { remaining, trueLabel } = timer

    return <TimerLayout page='timer'>
      <Title title={`${ms(remaining, true)} • ${trueLabel}`} />
      <TimerControls {...this.props} />
      <div className='timer-spacer' />
      <TimerDisplay timer={timer} />
      <div className='timer-spacer' />
      <div className='timer-actions'>
        <button
          aria-label='Stop'
          className='timer-button button -stop'
          onClick={() => this.props.onStop()}>
          <span className='icon' />
        </button>
      </div>
    </TimerLayout>
  }
}

export default connect(
  state => ({
    now: get(state, 'time.now'),
    timer: Timer.full(state)
  }),
  dispatch => ({
    onStop: () => {
      dispatch({ type: 'timer:stop!' })
    },
    onHome: () => {
      dispatch({ type: 'router:nav!', to: '/', replace: true })
    }
  })
)(TimerShow)
