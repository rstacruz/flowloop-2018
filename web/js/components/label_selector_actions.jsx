/* @flow */

/*::
  type Props = {
    editing: boolean,
    onEdit: () => void
  }
*/

import React from 'react'

export default function LabelSelectorActions ({ editing, onEdit } /*: Props */) {
  return <div className='label-selector-actions actions'>
    <button className='action -add'
      onClick={() => { onEdit() }}><span>New label</span></button>
    { editing
      ? <button className='action -finish'
        onClick={() => { onEdit() }}><span>Finish</span></button>
      : <button className='action -edit'
        onClick={() => { onEdit() }}><span>Edit</span></button> }
  </div>
}
