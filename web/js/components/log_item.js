/* @flow */

import type { Log } from '../selectors/log'
import type { Labels } from '../selectors/label'

type Props = {
  item: Log,
  labels: Labels,
  utc?: boolean
}

import React from 'react'
import Moment from 'moment'
import c from 'classnames'
import { full } from '../selectors/log'
import { full as fullLabel } from '../selectors/label'

/**
 * A single item.
 * 
 * @param {Log} props.item The log item
 * @param {Labels} props.label The labels
 * @param {boolean} [props.utc] UTC if true
 */

function LogItem ({ item, labels, utc }: Props) {
  const log = full([ item, labels ])
  const label = fullLabel(labels[item.labelId])

  const time = (utc ? Moment.utc(item.endedAt) : Moment(item.endedAt)).format('h:mm a')

  return <span
    aria-label={`${log.labelText} - ${time}`}
    key={item.id}
    className={itemClass(item)}>
    <span
      className='peg'
      style={{ backgroundColor: label.cssColor }} />
  </span>
}

/**
 * Class name
 */

function itemClass ({ timerType }: Log) {
  return c('timeline-small-item', {
    'hint--top': true,
    'hint--no-animate': true,
    '-break': timerType === 'break',
    '-work': timerType === 'work'
  })
}

/*
 * Export
 */

export default LogItem
