import React from 'react'
import { connect } from 'react-redux'
import get from '101/pluck'
import Title from 'react-document-title'
import ms from '../helpers/timer_display'

class TimerShow extends React.Component {
  render () {
    if (!this.props.active) {
      return <NoTimerActive {...this.props} />
    }

    const now = +this.props.now
    const elapsed = +now - +this.props.startedAt
    const remaining = +this.props.startedAt + this.props.duration - now

    return <div className="timer-layout">
      <Title title={'(' + ms(remaining) + ') ' + this.props.timerType} />

      <div className="timer-heading">
        <h1>{ms(remaining)}</h1>
        <p>
          {this.props.timerType}
          <span> - </span>
          {elapsed}
          <span> - </span>
          {ms(elapsed)}
          <span> of </span>
          {ms(this.props.duration)}
        </p>
      </div>

      <div className="timer-actions">
        <button
          className="timer-button button -stop"
          onClick={() => this.props.onStop()}>
          Stop
        </button>
      </div>
    </div>
  }
}

function NoTimerActive ({ onHome }) {
  return <div className="timer-layout">
    <Title title='No timer' />

    <div className="timer-heading">
      No timer active.
    </div>

    <div className="timer-actions">
      <button
        className="timer-button button -back"
        onClick={() => onHome()}>
        Back
      </button>
    </div>
  </div>
}

TimerShow = connect(
  state => ({
    now: get(state, 'time.now'),
    active: get(state, 'timer.active'),
    startedAt: get(state, 'timer.startedAt'),
    endsAt: get(state, 'timer.endsAt'),
    timerType: get(state, 'timer.type'),
    duration: get(state, 'timer.duration'),
  }),
  dispatch => ({
    onStop: () => {
      dispatch({ type: 'timer:stop!' })
    },
    onHome: () => {
      dispatch({ type: 'router:nav!', to: '/' })
    }
  }))(TimerShow)

export default TimerShow
