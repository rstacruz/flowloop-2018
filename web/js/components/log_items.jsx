/* @flow */

/*::
  import type { Logs, Log } from '../selectors/log'
*/

import React from 'react'
import Moment from 'moment'
import values from 'object-loops/values'
import c from 'classnames'

/*
 * List of items
 */

function LogItems ({ items } /*: { items: Logs } */) {
  return <span className='timeline-small-items'>
    {values(items).map(item =>
      <LogItem item={item} key={item.id} />)}
  </span>
}

/*
 * A single item
 */

function LogItem ({ item } /*: { item: Log } */) {
  const label = item.timerType === 'work'
    ? item.label
    : 'Break'

  const time = Moment(item.endedAt).format('h:mm a')

  return <span
    aria-label={`${label} - ${time}`}
    key={item.id}
    className={c('timeline-small-item', {
      'hint--top': true,
      'hint--no-animate': true,
      '-break': item.timerType === 'break',
      '-work': item.timerType === 'work'
    })}>
    <span className='peg' />
  </span>
}

export default LogItems
