/* @flow */

/*::
  import type { State } from '../selectors/state'
  import type { Label, Labels } from '../selectors/label'

  type UpdateProps = {
    id: string,
    payload: Label
  }
*/

import buildReducer from 'build-reducer'


/*
 * Label reducer
 */

export default buildReducer({
  'init': initLabels,
  'labels:update': updateLabel
})

/*
 * Prepares initial state
 */

function initLabels (state /*: State */) /*: State */ {
  return {
    ...state,
    labels: {
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
  }
}

/*
 * Updates a lebl
 */

function updateLabel (state /*: State */, { id, payload } /*: UpdateProps */) /*: State */ {
  let labels /*: Labels */ = state.labels

  labels = {
    ...labels,
    [id]: {
      ...(labels[id] || {}),
      ...payload,
      id: id
    }
  }

  return { ...state, labels }
}
