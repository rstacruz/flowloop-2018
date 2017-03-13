import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import c from 'classnames'
import { recents } from '../log'
import Moment from 'moment'
import get from '101/pluck'

class TimelineSummary extends React.Component {
  render () {
    const isEmpty = values(this.props.items).length === 0
    const now = this.props.now

    return <div className="timeline-summary fixed">
      <span className="-left text">{Moment(now).format('dddd')}</span>

      {isEmpty
        ? <Empty />
        : <Items items={this.props.items} />}

      <span className="-right text">{Moment(now).format('MMM D')}</span>
    </div>
  }
}

/*
 * No items
 */

function Empty () {
  return <span className='triangle' />
}

/*
 * List of items
 */

function Items ({ items }) {
  return <span className='timeline-small-items'>
    {values(items).map(item =>
      <Item item={item} />)}
  </span>
}

/*
 * A single item
 */

function Item ({ item }) {
  return <span
    aria-label={item.label}
    key={item.id}
    className={c('timeline-small-item', {
      'hint--top': true,
      'hint--no-animate': true,
      '-break': item.timerType === 'break',
      '-work': item.timerType === 'work',
    })}>
    <span className="peg" />
  </span>
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
