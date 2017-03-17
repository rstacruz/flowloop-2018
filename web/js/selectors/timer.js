/* @flow */

/*::
  import type { State } from './state'
  export type TimerType = 'work' | 'break'

  export type Timer = {
    active: boolean,
    startedAt?: Date,
    label?: string,
    labelId?: string,
    endsAt?: Date,
    type?: TimerType,
    duration?: number,
    laps?: number,
    lastLap?: Date,
    lastLogId?: null | string
  }

  export type FullTimer = {
    active: boolean,
    startedAt: Date,
    label: string,
    labelId: string,
    endsAt: Date,
    type: TimerType,
    duration: number,
    laps: number,
    lastLap: Date,
    lastLogId?: string,
    elapsed: number,
    remaining: number,
    labelText: string, // 'Work' | 'Chore' | 'Break'
    isOvertime: boolean, // If laps is 1 or more
    progress: number // 0..1 of the current lap
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
    const labelText = timer.type === 'work' ? timer.label : 'Break'
    const isOvertime = timer.laps && timer.laps > 0
    const progress = (now - +lastLap) / duration

    return {
      ...timer, elapsed, remaining, labelText, isOvertime, progress
    }
  }
)

/*
 * Export
 */

export default {
  full
}
