/* @flow */

/*::
  import type { Logs, Log, FullLog } from '../selectors/log'
  import type { Labels } from '../selectors/label'

  type Props = {
    items: Logs,
    labels: Labels
  }
*/

import React from 'react'
import LogItem from './log_item'
import values from 'object-loops/values'

/*
 * List of items
 */

function LogItems ({ items, labels } /*: Props */) {
  return <span className='timeline-small-items'>
    {values(items).map(item =>
      <LogItem item={item} labels={labels} key={item.id} />)}
  </span>
}

export default LogItems
