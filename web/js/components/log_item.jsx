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
import c from 'classnames'
import { full } from '../selectors/log'
import { full as fullLabel } from '../selectors/label'

/*
 * A single item
 */

function LogItem ({ item, labels } /*: Props */) {
  const log = full([ item, labels ])
  const label = fullLabel(labels[item.labelId])

  const time = Moment(item.endedAt).format('h:mm a')

  return <span
    aria-label={`${log.labelText} - ${time}`}
    key={item.id}
    className={c('timeline-small-item', {
      'hint--top': true,
      'hint--no-animate': true,
      '-break': item.timerType === 'break',
      '-work': item.timerType === 'work'
    })}>
    <span
      className='peg'
      style={{ backgroundColor: label.cssColor }} />
  </span>
}

export default LogItem
