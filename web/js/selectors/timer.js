import { createSelector } from 'reselect'
import get from '101/pluck'

/**
 * Full timer details
 */

export const full = createSelector(
  state => get(state, 'timer'),
  state => get(state, 'time.now'),
  (timer, now) => {
    if (!timer.active) return timer

    const lastLap = timer.lastLap
    const duration = timer.duration
    const elapsed = +now - timer.startedAt
    const remaining = +timer.endsAt - +now
    const trueLabel = timer.type === 'work' ? timer.label : 'Break'
    const isOvertime = timer.laps && timer.laps > 0
    const progress = (now - +lastLap) / duration

    return {
      ...timer, elapsed, remaining, trueLabel, isOvertime, progress
    }
  }
)

/*
 * Export
 */

export default {
  full
}
