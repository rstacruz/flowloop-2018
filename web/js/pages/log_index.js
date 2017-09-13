import React from 'react'
import Title from 'react-document-title'
import { byDate } from '../selectors/log'
import { connect } from 'react-redux'
import LogDates from '../components/log_dates'

/**
 * Timeline page
 */

export function LogIndex (props) {
  const {itemsByDate, onBack, labels} = props
  const isEmpty = Object.keys(itemsByDate).length === 0

  return <div className='timer-layout -log _page-bottom'>
    <Title title='Your timeline' />

    <div className='rawbody'>
      <div className='slim-container'>

        <div className='actions-list'>
          <div className='right'>
            <button
              className='icon-button -close'
              onClick={() => onBack()} />
          </div>
        </div>

        { isEmpty
          ? <LogBlankState />
          : <LogDates itemsByDate={itemsByDate} labels={labels} /> }
      </div>
    </div>
  </div>
}

function LogBlankState () {
  return <div className='blank-state -log'>
    <h2>Timeline</h2>
    <p>When you finish a work period, it will appear here.</p>
  </div>
}

/*
 * Redux
 */

export default connect(
  state => ({
    itemsByDate: byDate(state),
    labels: state.labels
  }),

  dispatch => ({
    onBack: () => {
      dispatch({ type: 'router:nav!', back: true, to: '/' })
    }
  })
)(LogIndex)
