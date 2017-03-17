/* @flow */

/*::
  import type { Label } from '../selectors/label'

  type Props = {
    label: Label,
    onSelect: () => void,
    selected: boolean,
    editing: boolean,
  }
*/

import React from 'react'
import c from 'classnames'

export default function LabelSelectorItem (props /*: Props */) {
  if (props.editing) {
    return <Edit {...props} />
  } else {
    return <View {...props} />
  }
}

function View (props /*: Props */) {
  const { label, onSelect, selected } = props

  return <button
    className={c('label-selector-item', 'item', { '-active': selected })}
    onClick={(e) => { e.preventDefault(); onSelect() }}>
    <span className='icon' style={{backgroundColor: label.color}} />
    <span className='name'>{label.name}</span>
  </button>
}

function Edit (props /*: Props */) {
  const { label, onSelect, selected } = props

  return <span
    className='label-selector-item item -editing'>
    <span className='icon' style={{backgroundColor: label.color}} />
    <input className='name -input' type='text' value={label.name} />
  </span>
}
