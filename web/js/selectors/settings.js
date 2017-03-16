/* @flow */

/*::
  import type { State } from './state'

  export type TimerMode = 'CONTINUOUS' | 'SINGLE' | 'ALTERNATE'

  export type Settings = {
    'duration:work': number,
    'duration:break': number,
    'duration:longBreak': number,
    'labels:labels': Array<string>,
    'labels:default': string,
    'timer:mode': TimerMode
  }
*/

import { createSelector } from 'reselect'
import get from '101/pluck'

/**
 * Default settings
 */

export const DEFAULTS /*: Settings */ = {
  'duration:work': 25 * 60 * 1000,
  'duration:break': 5 * 60 * 1000,
  'duration:longBreak': 15 * 60 * 1000,
  'labels:labels': ['Work', 'Chore', 'Side work'],
  'labels:default': 'Work',
  'timer:mode': 'CONTINUOUS'
}

/**
 * Available timer modes
 */

export const TIMER_MODES /*: Array<TimerMode> */ = [
  'CONTINUOUS', 'SINGLE', 'ALTERNATE'
]

/*
 * Labels
 */

export const TIMER_MODE_LABELS /*: { [key: TimerMode]: string } */ = {
  CONTINUOUS: 'Continuous',
  SINGLE: 'Single',
  ALTERNATE: 'Alternate'
}

/**
 * Returns full settings, including defaults
 */

export const full /*: (state: State) => Settings */ = createSelector(
  state => get(state, 'settings'),
  settings => {
    return Object.assign({}, DEFAULTS, settings || {})
  })

/*
 * Export
 */
export default {
  DEFAULTS,
  TIMER_MODES,
  TIMER_MODE_LABELS,
  full
}
