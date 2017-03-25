/* @flow */

/*::
  import type { Label } from '../selectors/label'

  import type { Props as ParentProps } from './label_selector_item'

  type State = {
    colorOpen: boolean
  }

  type Props = ParentProps & State & {
    // From State
    focused: boolean,
    onFocus: () => void,
    onBlur: () => void,
    onColorClose: () => void,
    onColorOpen: () => void
  }
*/

import React from 'react'
import c from 'classnames'
import { full as fullLabel } from '../selectors/label'
import { COLOR_NAMES } from '../selectors/color'
import ColorPicker from './color_picker'

/**
 * Edit mode
 */

export function LabelSelectorItemEdit (props /*: Props */) {
  const {
    label, focused, onFocus, onBlur, onLabelEdit, onLabelDelete,
    onLabelSetColor, onColorOpen, onColorClose, colorOpen
  } = props

  const label_ = fullLabel(label)

  return <span
    className={c('label-selector-item item -editing', { '-focus': focused })}>
    <span className='icon'>
      <button
        className='peg'
        onClick={() => { onColorOpen() }}
        style={{ backgroundColor: label_.cssColor }} />

      { colorOpen
      ? <span className='picker'>
        <ColorPicker
          options={COLOR_NAMES}
          selected={label.color}
          onChange={(color) => { onLabelSetColor(color); onColorClose() }} />
      </span>
      : null }
    </span>
    <span className='name'>
      <input
        className='input'
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
    <span className='actions'>
      { label_.isDeletable
        ? <button
          className='button -delete'
          onClick={e => { e.preventDefault(); onLabelDelete(label.id) }} />
        : null }
    </span>
  </span>
}

export default class LabelSelectorItemEditStateful extends React.PureComponent {
  /*:: state: State */
  /*:: props: ParentProps */

  constructor () {
    super()

    this.state = {
      colorOpen: false
    }
  }

  render () {
    const { props, state } = this
    return <LabelSelectorItemEdit
      onColorOpen={() => { this.setState({ colorOpen: true }) }}
      onColorClose={() => { this.setState({ colorOpen: false }) }}
      editing={props.editing}
      focused={props.focused}
      label={props.label}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onLabelDelete={props.onLabelDelete}
      onLabelEdit={props.onLabelEdit}
      onLabelSetColor={props.onLabelSetColor}
      onSelect={props.onSelect}
      selected={props.selected}
      {...props} {...state} />
  }
}
