/* @flow */

/*::
  import type { Label } from '../selectors/label'

  export type SProps = {
    label: Label,
    onSelect: () => void,
    onLabelEdit: (payload: { id: string }) => void,
    onLabelDelete: (id: string) => void,
    onLabelSetColor: (color: string) => void,
    selected: boolean,
    editing: boolean
  }

  export type Props = {
    label: Label,
    onSelect: () => void,
    onLabelEdit: (payload: { id: string }) => void,
    onLabelDelete: (id: string) => void,
    onLabelSetColor: (color: string) => void,
    selected: boolean,
    editing: boolean,

    // State
    focused: boolean,
    onFocus: () => void,
    onBlur: () => void
  }
*/

import React from 'react'
import c from 'classnames'
import { full as fullLabel } from '../selectors/label'
import Edit from './label_selector_item_edit'

/*
 * Stateless component
 */

export function LabelSelectorItem (props /*: Props */) {
  if (props.editing) {
    return <Edit {...props} />
  } else {
    return <View {...props} />
  }
}

/*
 * State
 */

export default class LabelSelectItemStateful extends React.PureComponent {
  /*::
    state: { focused: boolean }
    props: SProps
  */

  constructor () {
    super()
    this.state = { focused: false }
  }

  render () {
    const { props, state } = this
    return <LabelSelectorItem
      onFocus={() => { this.setState({ focused: true }) }}
      onBlur={() => { this.setState({ focused: false }) }}
      label={props.label}
      onSelect={props.onSelect}
      onLabelEdit={props.onLabelEdit}
      onLabelDelete={props.onLabelDelete}
      onLabelSetColor={props.onLabelSetColor}
      selected={props.selected}
      editing={props.editing}
      {...props} {...state} />
  }
}

/*
 * View mode
 */

function View (props /*: Props */) {
  const { label, onSelect, selected } = props
  const label_ = fullLabel(label)

  return <button
    className={c('label-selector-item', 'item', { '-active': selected })}
    onClick={(e) => { e.preventDefault(); onSelect() }}>
    <span className='icon'>
      <span className='peg' style={{ backgroundColor: label_.cssColor }} />
    </span>
    <span className='name'>{label_.name}</span>
  </button>
}
