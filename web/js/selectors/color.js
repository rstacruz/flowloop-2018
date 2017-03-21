/* @flow */

import { createSelector } from 'reselect'

/**
 * Color palette.
 * These are #500 on the material design palette.
 */

export const COLORS /*: { [key: string]: string } */ = {
  'RED': '#f44336',
  'INDIGO': '#3f51b5',
  'GREEN': '#4caf50',
  'AMBER': '#ffc107',
  'BROWN': '#795548',
  'BLUE': '#2196f3',
  'SLATE': '#607d8b',
  'BLACK': '#263238' // bluegray#900
}

/**
 * Names of colors.
 */
export const COLOR_NAMES /*: Array<string> */ = Object.keys(COLORS)

/**
 * Converts a color name to a CSS color.
 *
 *     toCSS('brown') => '#795548'
 */
export const toCSS /*: (name: string) => string */ = createSelector(
  name => name,
  name => COLORS[name] || name)

/**
 * Default exports.
 */

export default {
  COLORS,
  COLOR_NAMES,
  toCSS
}
