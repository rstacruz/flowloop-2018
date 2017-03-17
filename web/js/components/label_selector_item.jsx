/* @flow */

/*::
  import type { Label } from '../selectors/label'

  type Props = {
    label: Label,
    onSelect: () => void,
    selected: boolean
  }
*/

import React from 'react'
import c from 'classnames'

export default class LabelSelectorItem extends React.Component {
  /*:: props: Props */

  render () {
    const { label, onSelect, selected } = this.props

    return <button
      className={c('label-selector-item', 'item', { '-active': selected })}
      onClick={(e) => { e.preventDefault(); onSelect() }}>
      <span className='icon' style={{backgroundColor: label.color}} />
      <span className='name'>{label.name}</span>
    </button>
  }
}
