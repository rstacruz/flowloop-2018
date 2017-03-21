/* @flow */

/*::
  type Props = {
    editing: boolean,
    onEdit: () => void,
    onFinish: () => void,
    onLabelAdd: () => void
  }
*/

import React from 'react'

export default function LabelSelectorActions (props /*: Props */) {
  const { editing, onEdit, onFinish, onLabelAdd } = props

  return <div className='label-selector-actions actions'>
    <button className='action -add'
      onClick={() => { onLabelAdd(); onEdit() }}><span>New label</span></button>
    { editing
      ? <button className='action -finish'
        onClick={() => { onFinish() }}><span>Finish</span></button>
      : <button className='action -edit'
        onClick={() => { onEdit() }}><span>Edit</span></button> }
  </div>
}
