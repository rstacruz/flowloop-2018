import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import c from 'classnames'
import { recents } from '../log'

class TimelineSummary extends React.Component {
  render () {
    const items = values(this.props.items)
    const isEmpty = items.length === 0

    return <div className="timeline-summary fixed">
      {isEmpty
        ? <Empty />
        : items.map(item => <Item item={item} />)}
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
 * A single item
 */

function Item ({ item }) {
  return <span className={c('timeline-small-item', {
    '-break': item.timerType === 'break',
    '-work': item.timerType === 'work',
  })}>
    {item.label}
  </span>
}

/*
 * Redux
 */

TimelineSummary = connect(
  state => ({
    items: recents(state)
  }),
  dispatch => ({})
)(TimelineSummary)

export default TimelineSummary
