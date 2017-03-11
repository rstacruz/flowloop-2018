import React from 'react'
import { connect } from 'react-redux'

class TimerShow extends React.Component {
  render () {
    return <div>
      Timer on going
    </div>
  }
}

TimerShow = connect(
  state => ({}),
  dispatch => ({}))(TimerShow)

export default TimerShow
