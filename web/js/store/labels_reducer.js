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
import uuid from 'uuid'
import { nextColor } from '../selectors/label'

/*
 * Default labels
 */

const DEFAULT_LABELS /*: Labels */ = {
  '_default': {
    id: '_default',
    name: 'Work',
    color: 'BLUE'
  },
  '_chore': {
    id: '_chore',
    name: 'Chore',
    color: 'SLATE'
  }
}

/*
 * Label reducer
 */

export default buildReducer({
  'init': initLabels,
  'labels:load': loadLabels,
  'label:update': updateLabel,
  'label:create': createLabel,
  'label:delete': deleteLabel
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

/*
 * Creates labels
 */

function createLabel (state /*: State */) /*: State */ {
  let labels /*: Labels */ = state.labels || {}
  let id = uuid.v4()

  let label /*: Label */ = {
    id,
    name: '',
    color: nextColor(labels)
  }

  labels = {
    ...labels,
    [id]: label
  }

  return { ...state, labels }
}

/*
 * Deletes a label
 */

function deleteLabel (state /*: State */, { id } /*: { id: string } */) /*: State */ {
  let labels /*: Labels */ = state.labels || {}

  // We have to nullify them to mark them as deleted.
  // When they're persisted, they'll write over the old one.
  labels = { ...labels, [id]: null }
  return { ...state, labels }
}
