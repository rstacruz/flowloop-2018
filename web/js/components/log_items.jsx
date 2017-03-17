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
import Moment from 'moment'
import values from 'object-loops/values'
import c from 'classnames'
import { full } from '../selectors/log'
import LogItem from './log_item'

/*
 * List of items
 */

function LogItems ({ items, labels } /*: Props */) {
  return <span className='timeline-small-items'>
    {values(items).map(item =>
      <LogItem item={item} labels={labels} key={item.id} />)}
  </span>
}

//log_item.jsx

export default LogItems
