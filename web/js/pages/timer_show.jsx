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

    const { now, timerType, startedAt, duration, label } = this.props
    const elapsed = +now - +startedAt
    const remaining = +startedAt + duration - +now

    return <div className="timer-layout">
      <Title title={'(' + ms(remaining, true) + ') ' + timerType} />

      <div className="timer-heading">
        <p>
          {timerType === 'work'
            ? <LabelSelector label={label} />
            : <em>Break</em>}
          <br />
          {ms(elapsed)}
          <span> of </span>
          {ms(duration)}
        </p>
      </div>

      <div className="timer-display">
        <span className="label">{ms(remaining, true)}</span>
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

class LabelSelector extends React.Component {
  render () {
    return <strong>{this.props.label}</strong>
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
    label: get(state, 'timer.label'),
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
