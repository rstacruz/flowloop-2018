/* @flow */

/*::
  import type { ColorName } from '../selectors/color'

  type Props = {
    options: Array<string>,
    selected: ColorName,
    onChange: (color: ColorName) => void
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
