import React from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import HomeIndex from './home_index'
import TimerShow from './timer_show'
import LogIndex from './log_index'
import get from '101/pluck'

export class Chrome extends React.Component {
  render () {
    const { page } = this.props

    return <TransitionGroup
      transitionName='_page'
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      { page === 'HomeIndex'
        ? <HomeIndex key='timer' />
        : page === 'TimerShow'
        ? <TimerShow key='timer' />
        : page === 'LogIndex'
        ? <LogIndex key='log' />
        : <div key='other' /> }
    </TransitionGroup>
  }
}

export default connect(
  state => ({
    page: get(state, 'route.page')
  }),
  dispatch => ({
  })
)(Chrome)
