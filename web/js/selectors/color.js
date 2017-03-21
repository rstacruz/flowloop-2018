/* @flow */

/*::
  export type ColorName = $Keys<typeof COLORS>
*/

import { createSelector } from 'reselect'

/**
 * Color palette.
 * These are #500 on the material design palette.
 */

export const COLORS /*: { [key: ColorName]: string } */ = {
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

export const COLOR_NAMES /*: Array<ColorName> */ = Object.keys(COLORS)

/**
 * Color for breaks.
 */

export const BREAK_COLOR /*: string */ = '#c6cad0'

/**
 * Converts a color name to a CSS color.
 *
 *     toCSS('brown') => '#795548'
 */
export const toCSS /*: (name: ColorName) => string */ = createSelector(
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
