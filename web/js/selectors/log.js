/* @flow */

/*::
  import type { State } from './state'
  import type { Labels } from './label'
  import type { TimerType } from './timer'

  export type Logs = {
    [key: string]: Log | null
  }

  export type Log = {
    id: string,
    timerType: TimerType,
    startedAt: Date,
    endedAt: Date,
    duration: number,
    labelId: string,
    isComplete: boolean
  }

  export type FullLog = {
    id: string,
    timerType: TimerType,
    startedAt: Date,
    endedAt: Date,
    duration: number,
    labelId: string,
    isComplete: boolean,
    labelText: string
  }

  export type LogsByDate = {
    [key: string]: Array<Log>
  }
*/

import filter from 'object-loops/filter'
import get from '101/pluck'
import groupBy from '101/group-by'
import values from 'object-loops/values'
import { createSelector } from 'reselect'
import { full as fullLabel } from './label'

/*
 * Returns midnight
 */

export const midnight /*: (state: State) => Date */ = createSelector(
  state => get(state, 'time.now'),
  now => truncateDate(now))

/*
 * Recent work logs
 */

export const recents /*: (state: State) => Logs */ = createSelector(
  state => state.log,
  state => midnight(state),
  (log, time) => {
    log = onlyWork(log)
    log = filter(log, i => i.startedAt > time)
    return log
  })

/*
 * Full
 */

export const full /*: ([Log, Labels]) => FullLog */ = createSelector(
  ([log, _]) => log,
  ([log, labels]) => {
    return fullLabel(log.labelId && labels[log.labelId])
  },
  (log, label) => {
    return {
      ...log,
      labelText: log.timerType === 'work' ? label.name : 'Break'
    }
  })

/*
 * By date
 */

export const byDate /*: (state: State) => LogsByDate */ = createSelector(
  state => state.log || {},
  log => {
    return groupBy(values(log).filter(Boolean), item =>
      truncateDate(item.startedAt).toISOString())
  })

/*
 * Only work
 */

export const onlyWork /*: (logs: Logs) => Logs */ = createSelector(
  (log /*: Log */) => log || {},
  (log /*: Log */) => {
    return filter(log, item => item && item.timerType === 'work')
  })

/**
 * Truncates a date to midnight.
 */

export function truncateDate (date /*: Date */) {
  date = new Date(date)
  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)
  return date
}

/*
 * Export
 */

export default {
  recents,
  byDate,
  onlyWork
}
