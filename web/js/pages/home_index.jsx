import React from 'react'
import { connect } from 'react-redux'
import Title from 'react-document-title'
import TimerLayout from '../components/timer_layout'
import WelcomeToast from '../components/welcome_toast'

export class HomeIndex extends React.PureComponent {
  render () {
    return <TimerLayout page='home' className='_page-fade'>
      <Title title='Flowloop · Productivity Timer' />

      <div className='timer-chooser'>
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

      <WelcomeToast />
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
