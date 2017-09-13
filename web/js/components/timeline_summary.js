/* @flow */

/*::
  import type { Dispatch } from 'redux'
  import type { State } from '../selectors/state'
  import type { Logs } from '../selectors/log'
  import type { Labels } from '../selectors/label'

  type Props = {
    now: Date,
    items: Logs,
    labels: Labels,
    className?: string
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import { recents } from '../selectors/log'
import Moment from 'moment'
import LogItems from './log_items'
import get from '101/pluck'

export class TimelineSummary extends React.PureComponent {
  /*:: props: Props */

  render () {
    const { items, now, labels, className } = this.props
    const isEmpty = values(items).length === 0

    return <a className={`timeline-summary ${className || ''}`} href='#log'>
      <span className='-left text'>{Moment(now).format('dddd')}</span>

      {isEmpty
        ? <Empty />
        : <LogItems items={items} labels={labels} />}

      <span className='-right text'>{Moment(now).format('MMM D')}</span>
    </a>
  }
}

/*
 * No items
 */

function Empty () {
  return <span className='triangle' />
}

/*
 * Redux
 */

export default connect(
  (state /*: State */) => ({
    items: recents(state),
    labels: state.labels,
    now: get(state, 'time.now')
  }),
  (dispatch /*: Dispatch<*> */) => ({})
)(TimelineSummary)
