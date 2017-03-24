import React from 'react'
import { connect } from 'react-redux'
import Title from 'react-document-title'
import TimerLayout from '../components/timer_layout'

export class HomeIndex extends React.Component {
  render () {
    return <TimerLayout page='home' className='_page-fade'>
      <Title title='Flowloop · productivity timer' />

      <div className='timer-actions'>
        <button
          className='button timer-button -work -large'
          onClick={() => this.props.onStartClick('work')}>
          Work
        </button>

        <div className='logo app-logo' />

        <button
          className='button timer-button -break -large'
          onClick={() => this.props.onStartClick('break')}>
          Break
        </button>
      </div>
    </TimerLayout>
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onStartClick (timer) {
      dispatch({ type: 'timer:start!', timerType: timer })
    }
  })
)(HomeIndex)
