/* @flow */

/*::
  import type { Dispatch } from 'redux'
  import type { State } from '../selectors/state'
  import type { Labels } from '../selectors/label'

  type Props = {
    labels: Labels,
    label: string,
    onSelect: () => void,
    selectedId?: string
  }
*/

import React from 'react'
import { connect } from 'react-redux'
import values from 'object-loops/values'
import LabelSelectorItem from './label_selector_item'

/*
 * Selects labels
 */

export class LabelSelector extends React.Component {
  /*:: props: Props */

  render () {
    const { labels, onSelect, selectedId } = this.props

    return <div className='label-selector'>
      <button className='label-selector-dropdown dropdown'>
        <span className='label'>{this.props.label}</span>
      </button>

      <div className='label-selector-menu menu'>
        {values(labels).map(label =>
          <LabelSelectorItem
            label={label}
            key={label.id}
            selected={selectedId === label.id}
            onSelect={onSelect} />
        )}
      </div>
    </div>
  }
}

/*
 * Redux
 */

export default connect(
  (state /*: State */) => ({
    labels: state.labels
  }),
  (dispatch /*: Dispatch<*> */) => ({})
)(LabelSelector)
