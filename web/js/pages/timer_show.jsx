import React from 'react'
import get from '101/pluck'
import { connect } from 'react-redux'

import TimerBlank from '../components/timer_blank'
import TimerLayout from '../components/timer_layout'
import TimerControls from '../components/timer_controls'
import TimerDisplay from '../components/timer_display'
import TimerTitle from '../components/timer_title'
import Timer from '../selectors/timer'

export class TimerShow extends React.Component {
  render () {
    if (!this.props.timer.active) {
      return <TimerBlank {...this.props} />
    }

    const { timer } = this.props

    return <TimerLayout page='timer' className='_page-fade'>
      <TimerTitle timer={timer} />
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
