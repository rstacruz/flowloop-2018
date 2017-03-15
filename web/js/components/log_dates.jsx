import React from 'react'
import Moment from 'moment'
import LogItems from './log_items'
import values from 'object-loops/values'

function LogDates ({ items }) {
  return <div className='log-dates'>
    {values(items).map(logItems =>
      <div className='log-date'>
        <h2 className='date'>
          {Moment(logItems[0].startedAt).format('ddd, MMM DD')}
        </h2>

        <span className='dates'>
          <LogItems items={logItems} />
        </span>
      </div>
    )}
  </div>
}

export default LogDates
