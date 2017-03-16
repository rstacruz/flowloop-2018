/* @flow */

/*::
  type Props = {
    label: string
  }
*/

import React from 'react'

class LabelSelector extends React.Component {
  /*:: props: Props */
  render () {
    return <strong className='label-selector'>
      <span className='label'>{this.props.label}</span>
    </strong>
  }
}

export default LabelSelector
