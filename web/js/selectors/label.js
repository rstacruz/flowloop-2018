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

  export type FullLabel = Label
*/

import { createSelector } from 'reselect'

/*
 * Default label
 */

const DEFAULT_LABEL /*: FullLabel */ = {
  id: '',
  name: '(Unknown)',
  color: '#404050'
}

/*
 * Returns a full label, accounting for nulls
 */

export const full /*: (label: ?Label) => FullLabel */ = createSelector(
  (label /*: ?Label */) => label,
  (label /*: ?Label */) /*: Label */ => {
    if (!label) return DEFAULT_LABEL
    return label
  }
)
