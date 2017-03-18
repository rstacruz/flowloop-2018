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
    onLabelEdit: (payload: { id: string }) => void,

    // State
    editing: boolean,
    open: boolean,
    onToggleOpen: () => void,
    onDismiss: () => void,
    onEdit: () => void
  }

  type SProps = {
    labels: Labels,
    selectedId: string,
    onSelect: () => void,
    onLabelEdit: (payload: { id: string }) => void
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import LabelSelectorItem from './label_selector_item'
import LabelSelectorActions from './label_selector_actions'
import { full as fullLabel } from '../selectors/label'

/*
 * Selects labels
 */

export function LabelSelector (props /*: Props */) {
  const {
    labels, onSelect, selectedId, onToggleOpen, open, editing, onEdit,
    onLabelEdit, onDismiss
  } = props
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
            onLabelEdit={onLabelEdit}
            onSelect={() => { onDismiss(); onSelect(label.id) }} />
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
  /*::
    state: { open: boolean, editing: boolean }
    props: SProps
  */

  constructor () {
    super()
    this.state = { open: false, editing: false }
  }

  render () {
    const { open, editing } = this.state
    const { props, state } = this

    return <LabelSelector
      onDismiss={() => { this.setState({ open: false, editing: false }) }}
      onEdit={() => { this.setState({ editing: !editing }) }}
      onToggleOpen={() => { this.setState({ open: !open }) }}
      labels={props.labels}
      onLabelEdit={props.onLabelEdit}
      onSelect={props.onSelect}
      selectedId={props.selectedId}
      {...props} {...state} />
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
    onSelect: (id /*: string */) => {
      dispatch({ type: 'timer:setLabelId', id })
    },
    onLabelEdit: (payload /*: { id: string } */) => {
      dispatch({ type: 'label:update', payload })
    }
  })
)(LabelSelectorStateful)
