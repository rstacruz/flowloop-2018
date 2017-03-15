import React from 'react'
import Title from 'react-document-title'
import { byDate } from '../selectors/log'
import { connect } from 'react-redux'
import LogDates from '../components/log_dates'

export class LogIndex extends React.Component {
  render () {
    return <div className='timer-layout -log'>
      <Title title='Your timeline' />

      <div className='rawbody'>
        <div className='slim-container'>

          <div className='actions-list'>
            <div className='right'>
              <button
                className='icon-button -close'
                onClick={() => this.props.onBack()} />
            </div>
          </div>

          <LogDates itemsByDate={this.props.itemsByDate} />
        </div>
      </div>
    </div>
  }
}

export default connect(
  state => ({
    itemsByDate: byDate(state)
  }),

  dispatch => ({
    onBack: () => {
      dispatch({ type: 'router:nav!', back: true, to: '/' })
    }
  })
)(LogIndex)
