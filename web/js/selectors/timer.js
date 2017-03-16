/* @flow */

/*::
  import type { State } from './state'
  export type TimerType = 'work' | 'break'

  export type Timer = {
    active: boolean,
    startedAt?: Date,
    label?: string,
    endsAt?: Date,
    type?: TimerType,
    duration?: number,
    laps?: number,
    lastLap?: Date,
    lastLogId?: null | string
  }

  export type FullTimer = {
    active: boolean,
    startedAt?: Date,
    label?: string,
    endsAt?: Date,
    type?: TimerType,
    duration?: number,
    laps?: number,
    lastLap?: Date,
    lastLogId?: string,
    elapsed: number,
    remaining: number,
    trueLabel: string,
    isOvertime: boolean,
    progress: number
  }
*/

import { createSelector } from 'reselect'
import get from '101/pluck'

/**
 * Full timer details
 */

export const full /*: (state: State) => FullTimer */ = createSelector(
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
