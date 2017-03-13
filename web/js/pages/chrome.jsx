import React from 'react'
import { connect } from 'react-redux'
import HomeIndex from './home_index'
import TimerShow from './timer_show'
import get from '101/pluck'

class Chrome extends React.Component {
  render () {
    switch (this.props.page) {
      case 'HomeIndex':
        return <HomeIndex />
      case 'TimerShow':
        return <TimerShow />
      default:
        return <div></div>
    }
  }
}

Chrome = connect(
  state => ({
    page: get(state, 'route.page'),
  }),
  dispatch => ({
  }))(Chrome)

export default Chrome
