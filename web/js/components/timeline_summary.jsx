import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import { recents } from '../log'
import Moment from 'moment'
import LogItems from './log_items'
import get from '101/pluck'

class TimelineSummary extends React.Component {
  render () {
    const isEmpty = values(this.props.items).length === 0
    const now = this.props.now

    return <a className="timeline-summary fixed" href="#log">
      <span className="-left text">{Moment(now).format('dddd')}</span>

      {isEmpty
        ? <Empty />
        : <LogItems items={this.props.items} />}

      <span className="-right text">{Moment(now).format('MMM D')}</span>
    </a>
  }
}

/*
 * No items
 */

function Empty () {
  return <span className='triangle' />
}

/*
 * Redux
 */

TimelineSummary = connect(
  state => ({
    items: recents(state),
    now: get(state, 'time.now')
  }),
  dispatch => ({})
)(TimelineSummary)

export default TimelineSummary
