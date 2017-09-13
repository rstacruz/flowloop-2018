/* @flow */

/*::
  import type { ColorName } from '../selectors/color'

  type Props = {
    color: ColorName,
    selected: boolean,
    onSelect: () => void
  }
*/

import React from 'react'
import { toCSS } from '../selectors/color'
import c from 'classnames'

export default function ColorPickerItem (props /*: Props */) {
  const { color, selected, onSelect } = props
  return <button
    className={c('color-picker-item', { '-active': selected })}
    onClick={() => { onSelect() }}>
    <span
      className='peg'
      style={{ backgroundColor: toCSS(color) }} />
  </button>
}
