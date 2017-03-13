import { createSelector } from 'reselect'
import filter from 'object-loops/filter'
import get from '101/pluck'

/*
 * Returns midnight
 */

export const midnight = createSelector(
  state => get(state, 'time.now'),
  now => Math.floor(+now / 86400000) * 86400000)

/*
 * Recent work logs
 */

export const recents = createSelector(
  state => state.log,
  state => midnight(state),
  (log, time) => {
    log = filter(log, i => i.timerType === 'work')
    log = filter(log, i => i.startedAt > time)
    return log
  })
