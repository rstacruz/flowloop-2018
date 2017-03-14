import React from 'react'
import { connect } from 'react-redux'
import Title from 'react-document-title'
import TimerLayout from '../components/timer_layout'

class HomeIndex extends React.Component {
  render () {
    return <TimerLayout page="home">
      <Title title='Flowloop' />

      <div className="timer-actions">
        <button
          className="button timer-button -work -large"
          onClick={() => this.props.onStartClick('work')}>
          Work
        </button>

        <button
          className="button timer-button -break -large"
          onClick={() => this.props.onStartClick('break')}>
          Break
        </button>
      </div>
    </TimerLayout>
  }
}

HomeIndex = connect(
  state => ({}),
  dispatch => ({
    onStartClick (timer) {
      dispatch({ type: 'timer:start!', timerType: timer })
    }
  })
)(HomeIndex)

export default HomeIndex
