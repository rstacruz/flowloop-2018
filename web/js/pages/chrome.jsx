import React from 'react'
import { connect } from 'react-redux'
import HomeIndex from './home_index'
import TimerShow from './timer_show'
import LogIndex from './log_index'
import get from '101/pluck'

export class Chrome extends React.Component {
  render () {
    switch (this.props.page) {
      case 'HomeIndex':
        return <HomeIndex />
      case 'TimerShow':
        return <TimerShow />
      case 'LogIndex':
        return <LogIndex />
      default:
        return <div />
    }
  }
}

export default connect(
  state => ({
    page: get(state, 'route.page')
  }),
  dispatch => ({
  })
)(Chrome)
