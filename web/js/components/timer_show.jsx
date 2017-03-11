import React from 'react'
import { connect } from 'react-redux'
import get from '101/pluck'

class TimerShow extends React.Component {
  render () {
    const remaining = +this.props.endsAt - new Date().getTime()

    return <div>
      <h2>{this.props.timerType}</h2>
      <div>{+remaining}</div>
    </div>
  }
}

TimerShow = connect(
  state => ({
    startedAt: get(state, 'timer.startedAt'),
    endsAt: get(state, 'timer.endsAt'),
    timerType: get(state, 'timer.type'),
    duration: get(state, 'timer.duration'),
  }),
  dispatch => ({}))(TimerShow)

export default TimerShow
