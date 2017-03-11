import React from 'react'
import { connect } from 'react-redux'
import get from '101/pluck'

class TimerShow extends React.Component {
  render () {
    const elapsed = new Date().getTime() - +this.props.startedAt

    if (!this.props.active) {
      return <div>
        No timer active.
        <button onClick={() => this.props.onHome()}>Back</button>
      </div>
    }

    return <div>
      <h2>{this.props.timerType}</h2>
      <div>
        {+elapsed}
        of {+this.props.duration}
      </div>
      <button onClick={() => this.props.onStop()}>Stop</button>
    </div>
  }
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
