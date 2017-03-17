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
    editing: boolean,
    open: boolean,
    onToggleOpen: () => void,
    onDismiss: () => void,
    onEdit: () => void
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import LabelSelectorItem from './label_selector_item'
import LabelSelectorActions from './label_selector_actions'
import connectState from '../helpers/connect_state'
import { full as fullLabel } from '../selectors/label'

/*
 * Selects labels
 */

export function LabelSelector (props /*: Props */) {
  const { labels, onSelect, selectedId, onToggleOpen, open, editing, onEdit } = props
  const label = fullLabel(labels[selectedId])

  return <div className='label-selector'>
    <button
      onClick={() => { onToggleOpen() }}
      className='label-selector-dropdown dropdown'>
      <span className='label'>{label.name}</span>
    </button>

    { open
      ? <div className='label-selector-menu menu _pop-in'>
        {values(labels).map(label =>
          <LabelSelectorItem
            label={label}
            key={label.id}
            editing={editing}
            selected={selectedId === label.id}
            onSelect={() => { props.onDismiss(); onSelect(label.id) }} />
          )}

        {/* Add and edit buttons */}
        <LabelSelectorActions editing={editing} onEdit={onEdit} />
      </div>
      : null }
  </div>
}

/*
 * State
 */

export class LabelSelectorStateful extends React.Component {
  constructor () {
    super()
    this.state = { open: false, editing: false }
  }

  render () {
    const { open, editing } = this.state
    return <LabelSelector
      onDismiss={() => { this.setState({ open: false, editing: false }) }}
      onEdit={() => { this.setState({ editing: !editing }) }}
      onToggleOpen={() => { this.setState({ open: !open }) }}
      {...this.props} {...this.state} />
  }
}

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
