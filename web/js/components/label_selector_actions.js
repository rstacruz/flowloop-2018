/* @flow */

import React from 'react'

type Props = {
  editing: boolean,
  onEdit: () => void,
  onFinish: () => void,
  onLabelAdd: () => void
}

export default function LabelSelectorActions (props: Props) {
  const { editing } = props

  return (
    <div className='label-selector-actions actions'>
      <Add {...props} />
      {editing ? <Finish {...props} /> : <Edit {...props} />}
    </div>
  )
}

export function Add ({ onLabelAdd, onEdit }: Props) {
  return (
    <button
      className='action -add'
      onClick={() => {
        onLabelAdd()
        onEdit()
      }}
    >
      <span>New label</span>
    </button>
  )
}

/**
 * Finish button
 */

function Finish ({ onFinish }: Props) {
  return (
    <button
      className='action -finish'
      onClick={() => {
        onFinish()
      }}
    >
      <span>Finish</span>
    </button>
  )
}

/**
 * Edit button
 */

function Edit ({ onEdit }: Props) {
  return (
    <button
      className='action -edit'
      onClick={() => {
        onEdit()
      }}
    >
      <span>Edit</span>
    </button>
  )
}
