/* @flow */

/*::
  import type { Label } from '../selectors/label'

  type SProps = {
    label: Label,
    onSelect: () => void,
    onLabelEdit: (payload: { id: string }) => void,
    selected: boolean,
    editing: boolean
  }

  type Props = {
    label: Label,
    onSelect: () => void,
    onLabelEdit: (payload: { id: string }) => void,
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

export default class LabelSelectItemStateful extends React.Component {
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

  return <button
    className={c('label-selector-item', 'item', { '-active': selected })}
    onClick={(e) => { e.preventDefault(); onSelect() }}>
    <span className='icon' style={{backgroundColor: label.color}} />
    <span className='name'>{label.name}</span>
  </button>
}

/*
 * Edit mode
 */

function Edit (props /*: Props */) {
  const { label, focused, onFocus, onBlur, onLabelEdit } = props

  return <span
    className={c('label-selector-item item -editing', { '-focus': focused })}>
    <span className='icon' style={{backgroundColor: label.color}} />
    <input
      className='name -input'
      type='text'
      defaultValue={label.name}
      onFocus={onFocus}
      onChange={e => {
        onLabelEdit({
          id: label.id,
          name: e.target.value
        })
      }}
      onBlur={onBlur} />
  </span>
}
