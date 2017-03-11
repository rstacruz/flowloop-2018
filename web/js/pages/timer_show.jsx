import React from 'react'
import { connect } from 'react-redux'
import get from '101/pluck'
import Title from 'react-document-title'

class TimerShow extends React.Component {
  render () {
    if (!this.props.active) {
      return <NoTimerActive {...this.props} />
    }

    const elapsed = new Date().getTime() - +this.props.startedAt

    return <div className="timer-layout">
      <Title title={'(' + (+elapsed) + ') ' + this.props.timerType} />

      <div className="timer-heading">
        <h2>{this.props.timerType}</h2>
        {+elapsed}
        of {+this.props.duration}
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
