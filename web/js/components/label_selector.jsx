/* @flow */

/*::
  import type { Dispatch } from 'redux'
  import type { State } from '../selectors/state'
  import type { Labels } from '../selectors/label'

  type Props = {
    // Redux
    labels: Labels,
    selectedId: string,
    onSelect: () => void,

    // State
    open: boolean,
    onToggleOpen: () => void,
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import LabelSelectorItem from './label_selector_item'
import connectState from '../helpers/connect_state'

/*
 * Selects labels
 */

export function LabelSelector (props /*: Props */) {
  const { labels, onSelect, selectedId, onToggleOpen, open } = props
  const label = labels[selectedId] || { name: 'Unknown' }

  return <div className='label-selector'>
    <button
      onClick={(e) => { e.preventDefault(); onToggleOpen() }}
      className='label-selector-dropdown dropdown'>
      <span className='label'>{label.name}</span>
    </button>

    { open
      ? <div className='label-selector-menu menu'>
          {values(labels).map(label =>
            <LabelSelectorItem
              label={label}
              key={label.id}
              selected={selectedId === label.id}
              onSelect={() => { onSelect(label.id) }} />
            )}
        </div>
      : null }
  </div>
}

/*
 * State
 */

export const LabelSelectorStateful = connectState(
  (state) => ({
    open: state.open || false
  }),
  (setState, props) => ({
    onToggleOpen: () => {
      setState({ open: !props.open })
    }
  })
)(LabelSelector)


/*
 * Redux
 */

export default connect(
  (state /*: State */) => ({
    labels: state.labels,
    selectedId: state.timer && state.timer.labelId
  }),
  (dispatch /*: Dispatch<*> */) => ({
    onSelect: (id /*: String */) => {
      dispatch({ type: 'timer:setLabelId', id })
    }
  })
)(LabelSelectorStateful)
