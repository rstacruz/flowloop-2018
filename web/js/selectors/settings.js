import { createSelector } from 'reselect'
import get from '101/pluck'

/**
 * Default settings
 */

export const DEFAULTS = {
  'duration:work': 25 * 60 * 1000,
  'duration:break': 5 * 60 * 1000,
  'duration:longBreak': 10 * 60 * 1000,
  'labels:labels': ['Work', 'Chore', 'Side work'],
  'labels:default': 'Work',
  'timer:mode': 'CONTINUOUS'
}

/**
 * Available timer modes
 */

export const TIMER_MODES = [
  'CONTINUOUS', 'SINGLE', 'ALTERNATE'
]

/*
 * Labels
 */

export const TIMER_MODE_LABELS = {
  CONTINUOUS: 'Continuous',
  SINGLE: 'Single',
  ALTERNATE: 'Alternate'
}

/**
 * Returns full settings, including defaults
 */

export const full = createSelector(
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
