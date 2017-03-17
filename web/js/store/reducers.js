import reduceReducers from 'reduce-reducers'

import log from './log_reducer'
import settings from './settings_reducer'
import timer from './timer_reducer'
import time from './time_reducer'
import route from './route_reducer'
import labels from './labels_reducer'

/*
 * Export
 */

export default reduceReducers(
  timer,
  time,
  route,
  settings,
  log,
  labels
)
