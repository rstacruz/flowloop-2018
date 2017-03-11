import React from 'react'
import { connect } from 'react-redux'
import Title from 'react-document-title'

class HomeIndex extends React.Component {
  render () {
    return <div className="timer-layout">
      <Title title='Timer' />

      <div className="timer-heading">
        Hello.
      </div>

      <div className="timer-actions">
        <button
          className="button timer-button -work"
          onClick={() => this.props.onStartClick('work')}>
          Work
        </button>

        <button
          className="button timer-button -break"
          onClick={() => this.props.onStartClick('break')}>
          Break
        </button>
      </div>
    </div>
  }
}

HomeIndex = connect(
  state => ({}),
  dispatch => ({
    onStartClick (timer) {
      dispatch({ type: 'timer:start!', timerType: timer })
    }
  }))(HomeIndex)

export default HomeIndex
