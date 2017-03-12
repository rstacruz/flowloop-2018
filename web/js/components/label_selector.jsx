import React from 'react'

class LabelSelector extends React.Component {
  render () {
    return <strong className="label-selector">
      <span className="label">{this.props.label}</span>
    </strong>
  }
}

export default LabelSelector
