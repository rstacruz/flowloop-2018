import React from 'react'
import { connect } from 'react-redux'

class Chrome extends React.Component {
  render () {
    return <div>
      <div>
        Hello.
      </div>

      <div className="actions">
        <button onClick={() => this.props.onStartClick('work')}>Work!</button>
        <button onClick={() => this.props.onStartClick('break')}>Break.</button>
      </div>
    </div>
  }
}

Chrome = connect(
  () => ({}),
  dispatch => ({
    onStartClick (timer) {
      dispatch({ type: 'work:start', timer })
    }
  }))(Chrome)

export default Chrome
