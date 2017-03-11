import { Component } from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

window.React = React

setTimeout(() => {
  document.querySelector('.webpack-welcome').className += ' -show'
}, 100)

class Chrome extends Component {
  render () {
    return <div>Hello, {this.props.name}</div>
  }
}

ReactDOM.render(<Chrome name='John' />, document.body)
