/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { Label, Labels } from '../selectors/label'

  type UpdateProps = {
    id: string,
    payload: Label
  }

  type LoadProps = {
    payload: Labels
  }
*/

import buildReducer from 'build-reducer'

/*
 * Default labels
 */

// TODO: This should be a selector!!!
const DEFAULT_LABELS /*: Labels */ = {
  '_default': {
    id: '_default',
    name: 'Work',
    color: 'dodgerblue'
  },
  '_chore': {
    id: '_chore',
    name: 'Chore',
    color: '#808090'
  }
}

/*
 * Label reducer
 */

export default buildReducer({
  'init': initLabels,
  'label:update': updateLabel,
  'labels:load': loadLabels
})

/*
 * Prepares initial state
 */

function initLabels (state /*: State */) /*: State */ {
  return {
    ...state,
    labels: DEFAULT_LABELS
  }
}

/*
 * Updates a label
 */

function updateLabel (state /*: State */, { payload } /*: UpdateProps */) /*: State */ {
  const id = payload.id
  if (!id) return state

  let labels /*: Labels */ = state.labels

  labels = {
    ...labels,
    [id]: {
      ...(labels[id] || {}),
      ...payload
    }
  }

  return { ...state, labels }
}

/*
 * Loads labels
 */

function loadLabels (state /*: State */, { payload } /*: LoadProps */) /*: State */ {
  return { ...state, labels: payload }
}
