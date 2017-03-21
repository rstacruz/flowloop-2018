/* @flow */

/*::
  type Props = {
    options: Array<string>,
    selected: string,
    onChange: (color: string) => void
  }
*/

import React from 'react'
import ColorPickerItem from './color_picker_item'

export default function ColorPicker (props /*: Props */) {
  const { options, selected, onChange } = props

  return <span className='color-picker'>
    { options.map(color =>
      <ColorPickerItem
        color={color}
        selected={color === selected}
        onSelect={() => { onChange(color) }}
        key={color} />) }
  </span>
}
