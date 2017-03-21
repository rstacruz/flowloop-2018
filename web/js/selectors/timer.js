/* @flow */

/*::
  import type { State } from './state'
  import type { Labels } from './label'

  export type TimerType = 'work' | 'break'

  export type Timer = {
    active: boolean,
    startedAt?: Date,
    labelId?: string,
    endsAt?: Date,
    type?: TimerType,
    duration?: number,
    laps?: number,
    lastLap?: Date,
    lastLogId?: null | string
  }

  export type ActiveTimer = {
    active: boolean,
    startedAt: Date,
    labelId: string,
    endsAt: Date,
    type: TimerType,
    duration: number,
    laps: number,
    lastLap: Date,
    lastLogId: null | string
  }

  export type FullTimer = {
    active: boolean,
    startedAt: Date,
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
import { full as fullLabel } from '../selectors/label'

/**
 * Inactive timer default
 */

export const INACTIVE /*: Timer */ = { active: false }

/**
 * Full timer details
 */

export const full /*: (state: State) => FullTimer */ = createSelector(
  state => state.timer,
  state => state.time && state.time.now,
  state => state.labels,
  (timer /*: Timer */, now /*: Date */, labels /*: Labels */) => {
    if (!timer.active) return timer

    const lastLap = timer.lastLap
    const duration = timer.duration
    const elapsed = +now - (timer.startedAt || 0)
    const remaining = +timer.endsAt - +now
    const label = fullLabel(labels[timer.labelId || '_default'])
    const labelText = timer.type === 'work' ? label.name : 'Break'
    const isOvertime = timer.laps && timer.laps > 0
    const progress = (now - +lastLap) / (duration || 30000)

    return {
      ...timer, elapsed, remaining, labelText, isOvertime, progress
    }
  }
)

/*
 * Export
 */

export default {
  INACTIVE,
  full
}
