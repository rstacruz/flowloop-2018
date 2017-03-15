import React from 'react'
import Moment from 'moment'
import LogItems from './log_items'
import values from 'object-loops/values'
import { onlyWork } from '../selectors/log'

function LogDates ({ itemsByDate }) {
  return <div className='log-dates'>
    {values(itemsByDate).map(logItems =>
      <div className='log-date' key={logItems[0].startedAt}>
        <h2 className='date'>
          {Moment(logItems[0].startedAt).format('ddd, MMM DD')}
        </h2>

        <span className='dates'>
          <LogItems items={onlyWork(logItems)} />
        </span>
      </div>
    )}
  </div>
}

export default LogDates
