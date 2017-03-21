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

  export type FullLabel = {
    id: string,
    name: string,
    color: string,
    isDeletable: boolean,
    cssColor: string
  }
*/

import { createSelector } from 'reselect'
import { DEFAULT_LABEL_ID } from './settings'
import { COLORS, toCSS } from './color'

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
 * Full export
 */

export default {
  full,
  DEFAULT_LABEL
}
