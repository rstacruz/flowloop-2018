/* @flow */

/*::
  import type { Log } from '../selectors/log'
  import type { Labels } from '../selectors/label'

  type Props = {
    item: Log,
    labels: Labels
  }
*/

import React from 'react'
import Moment from 'moment'
import values from 'object-loops/values'
import c from 'classnames'
import { full } from '../selectors/log'

/*
 * A single item
 */

function LogItem ({ item, labels } /*: Props */) {
  const label = full([ item, labels ]).labelText

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

export default LogItem
