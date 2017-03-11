import React from 'react'
import { connect } from 'react-redux'
import get from '101/pluck'
import Title from 'react-document-title'
import ms from '../helpers/timer_display'
import TimerLayout from '../components/timer_layout'

class TimerShow extends React.Component {
  render () {
    if (!this.props.active) {
      return <NoTimerActive {...this.props} />
    }

    const { now, timerType, startedAt, duration, label } = this.props
    const elapsed = +now - +startedAt
    const remaining = +startedAt + duration - +now

    const trueLabel = timerType === 'work' ? label : 'Break'

    return <TimerLayout page="timer">
      <Title title={`${ms(remaining, true)} - ${trueLabel}`} />

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

      <div className="timer-spacer" />

      <div className="timer-display">
        <span className="label">{ms(remaining, true)}</span>
      </div>

      <div className="timer-spacer" />

      <div className="timer-actions">
        <button
          className="timer-button button -stop"
          onClick={() => this.props.onStop()}>
          Stop
        </button>
      </div>
    </TimerLayout>
  }
}

class LabelSelector extends React.Component {
  render () {
    return <strong>{this.props.label}</strong>
  }
}

function NoTimerActive ({ onHome }) {
  return <TimerLayout>
    <Title title='No timer' />

    <div className="timer-heading">
      No timer active.
    </div>

    <div className="timer-spacer" />

    <div className="timer-actions">
      <button
        className="timer-button button -back"
        onClick={() => onHome()}>
        Back
      </button>
    </div>
  </TimerLayout>
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
