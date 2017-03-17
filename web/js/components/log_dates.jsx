/* @flow */

/*::
  import type { Labels } from '../selectors/label'
  import type { LogsByDate } from '../selectors/log'

  type Props = {
    itemsByDate: LogsByDate,
    labels: Labels
  }
*/

import React from 'react'
import Moment from 'moment'
import LogItems from './log_items'
import values from 'object-loops/values'
import { onlyWork } from '../selectors/log'

function LogDates ({ itemsByDate, labels } /*: Props */) {
  return <div className='log-dates'>
    {values(itemsByDate).map(logItems =>
      <div className='log-date' key={logItems[0].startedAt}>
        <h2 className='date'>
          {Moment(logItems[0].startedAt).format('ddd, MMM DD')}
        </h2>

        <span className='dates'>
          <LogItems items={onlyWork(logItems)} labels={labels} />
        </span>
      </div>
    )}
  </div>
}

export default LogDates
