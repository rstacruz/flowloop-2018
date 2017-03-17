import buildReducer from 'build-reducer'
import get from '101/pluck'
import mapObject from 'object-loops/map'
import put from '101/put'
import uuid from 'uuid'

/**
 * Log reducer
 */

export default buildReducer({
  'init': (state) => {
    return put(state, {
      'log': {}
    })
  },

  'log:load': (state, { payload }) => {
    let log = Object.assign({}, get(state, 'log') || {}, payload)

    // Unpack dates
    log = mapObject(log, item => {
      return Object.assign({}, item, {
        startedAt: new Date(item.startedAt),
        endedAt: new Date(item.endedAt)
      })
    })

    return put(state, 'log', log)
  },

  'log:addCurrent': (state) => {
    const id = uuid.v4()
    const timer = get(state, 'timer')
    const now = get(state, 'time.now')
    const startedAt = timer.lastLap || timer.startedAt

    return put(state, {
      'timer.lastLap': now,
      'timer.lastLogId': id,
      [`log.${id}`]: {
        id,
        startedAt,
        endedAt: now,
        duration: +now - +startedAt,
        timerType: timer.type,
        labelId: timer.labelId,
        isComplete: true
      }
    })
  }
})
