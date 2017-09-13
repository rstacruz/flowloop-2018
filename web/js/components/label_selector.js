/* @flow */

/*::
  import type { Dispatch } from 'redux'
  import type { State } from '../selectors/state'
  import type { Labels } from '../selectors/label'
  import type { ColorName } from '../selectors/color'

  type SProps = {
    // Redux
    labels: Labels,
    selectedId: string,
    onSelect: () => void,
    onLabelAdd: () => void,
    onLabelDelete: (id: string) => void,
    onLabelEdit: (payload: { id: string }) => void,
    onLabelSetColor: (id: string, color: ColorName) => void,
  }

  type Props = SProps & {
    // State
    editing: boolean,
    open: boolean,
    onToggleOpen: () => void,
    onDismiss: () => void,
    onEdit: () => void,
    onFinish: () => void
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import LabelSelectorItem from './label_selector_item'
import LabelSelectorActions from './label_selector_actions'
import { full as fullLabel } from '../selectors/label'
import c from 'classnames'

/*
 * Selects labels
 */

export function LabelSelector (props /*: Props */) {
  const {
    labels, onSelect, selectedId, onToggleOpen, open, editing, onEdit,
    onLabelEdit, onLabelDelete, onDismiss, onLabelAdd, onFinish,
    onLabelSetColor
  } = props

  const label = fullLabel(labels[selectedId])

  return <div className={c('label-selector', { '-open': open })}>
    <button
      onClick={() => { onToggleOpen() }}
      className={c('label-selector-dropdown dropdown', { '-open': open })}>
      <span className='label'>{label.name}</span>
    </button>

    <div className='screen' onClick={onDismiss} />

    { open
      ? <div className='label-selector-menu menu _pop-in'>
        <div className='items'>
          {values(labels).filter(Boolean).map(label =>
            <LabelSelectorItem
              label={label}
              key={label.id}
              editing={editing}
              selected={selectedId === label.id}
              onLabelDelete={onLabelDelete}
              onLabelEdit={onLabelEdit}
              onLabelSetColor={(color) => { onLabelSetColor(label.id, color) }}
              onSelect={() => { onDismiss(); onSelect(label.id) }} />
            )}
        </div>

        {/* Add and edit buttons */}
        <LabelSelectorActions
          editing={editing}
          onEdit={onEdit}
          onFinish={onFinish}
          onLabelAdd={onLabelAdd} />
      </div>
      : null }
  </div>
}

/*
 * State
 */

export class LabelSelectorStateful extends React.PureComponent {
  /*::
    state: { open: boolean, editing: boolean }
    props: SProps
  */

  constructor () {
    super()
    this.state = { open: false, editing: false }
  }

  render () {
    const { open } = this.state
    const { props, state } = this

    return <LabelSelector
      onDismiss={() => { this.setState({ open: false, editing: false }) }}
      onEdit={() => { this.setState({ open: true, editing: true }) }}
      onFinish={() => { this.setState({ open: true, editing: false }) }}
      onToggleOpen={() => { this.setState({ open: !open }) }}
      labels={props.labels}
      onLabelDelete={props.onLabelDelete}
      onLabelEdit={props.onLabelEdit}
      onLabelAdd={props.onLabelAdd}
      onLabelSetColor={props.onLabelSetColor}
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
    },
    onLabelDelete: (id /*: string */) => {
      dispatch({ type: 'label:delete', id })
    },
    onLabelSetColor: (id /*: string */, color /*: string */) => {
      dispatch({ type: 'label:update', payload: { id, color } })
    },
    onLabelAdd: () => {
      dispatch({ type: 'label:create' })
    }
  })
)(LabelSelectorStateful)
