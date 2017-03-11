import React from 'react'
import { connect } from 'react-redux'

class HomeIndex extends React.Component {
  render () {
    return <div>
      <div>
        Hello.
      </div>

      <div className="actions">
        <button onClick={() => this.props.onStartClick('work')}>Work</button>
        <button onClick={() => this.props.onStartClick('break')}>Break</button>
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
