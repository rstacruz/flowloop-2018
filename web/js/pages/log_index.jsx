import React from 'react'
import TimerLayout from '../components/timer_layout'
import Title from 'react-document-title'
import values from 'object-loops/values'
import { byDate } from '../selectors/log'
import { connect } from 'react-redux'
import LogDates from '../components/log_dates'

class LogIndex extends React.Component {
  render () {
    return <div className="timer-layout -log">
      <Title title='Your timeline' />

      <div className="rawbody">
        <div className="slim-container">

          <div className="actions-list">
            <div className="right">
              <button
                className="icon-button -close"
                onClick={() => this.props.onBack()}>
              </button>
            </div>
          </div>

          <LogDates items={this.props.itemsByDate} />
        </div>
      </div>
    </div>
  }
}

LogIndex = connect(
  state => ({
    itemsByDate: byDate(state)
  }),

  dispatch => ({
    onBack: () => {
      dispatch({ type: 'router:nav!', back: true, to: '/' })
    }
  })
)(LogIndex)

export default LogIndex
