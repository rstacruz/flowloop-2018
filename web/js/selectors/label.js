/* @flow */

/*::
  import type { State } from './state'

  export type Labels = {
    [key: string]: Label
  }

  export type Label = {
    id: string,
    name: string,
    color: string
  }

  export type FullLabel = Label & {
    isDeletable: boolean,
    cssColor: string
  }
*/

import { createSelector } from 'reselect'
import { DEFAULT_LABEL_ID } from './settings'
import { COLORS, COLOR_NAMES, toCSS } from './color'
import values from 'object-loops/values'

/**
 * Default label
 */

const DEFAULT_LABEL /*: FullLabel */ = {
  id: '',
  name: '(Unknown)',
  color: 'BLACK',
  isDeletable: false,
  cssColor: COLORS.BLACK
}

/**
 * Returns a full label, accounting for nulls.
 */

export const full /*: (label: ?Label) => FullLabel */ = createSelector(
  (label /*: ?Label */) => label,
  (label /*: ?Label */) /*: FullLabel */ => {
    if (!label) return DEFAULT_LABEL

    return {
      ...label,
      isDeletable: label.id !== DEFAULT_LABEL_ID,
      cssColor: toCSS(label.color)
    }
  }
)

/**
 * Returns the next viable color.
 */

export const nextColor /*: (labels: Labels) => string */ = createSelector(
  (labels /*: Labels */) => labels,
  (labels /*: Labels */) /*: string */ => {
    const colors = values(labels).filter(Boolean).map(l => l.color)
    const next = COLOR_NAMES.find(name => !colors.includes(name))
    return next || 'BLUE'
  })

/**
 * Full export
 */

export default {
  full,
  nextColor,
  DEFAULT_LABEL
}
