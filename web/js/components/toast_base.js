/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import Settings from '../selectors/settings'

import type { State as StoreState } from '../selectors/state'

type Action = {
  label: string,
  onClick?: () => void,
  className?: string
}

type Props = {
  id: string,
  actions?: Array<Action>,
  children: React.Node,
  isDismissed: boolean,
  onDismiss?: () => void
}

type State = {
  isDismissed: boolean
}

/**
 * Basis for all toast notifications
 */

export class ToastBase extends React.PureComponent<Props, State> {
  props: Props
  state: State

  constructor (props: Props) {
    super()

    this.state = {
      isDismissed: props.isDismissed || false
    }
  }

  render () {
    if (this.state.isDismissed) return null

    const { children, actions } = this.props

    return <div className='toast-base'>
      <div className='item'>
        <div className='toast-item _toast-pop-in'>
          {children}

          { actions && actions.length > 0
            ? <div className='actions'>
              { actions.map((action: Action, idx: number) =>
                <button
                  className={`action ${action.className || ''}`}
                  key={idx}
                  onClick={() => { this.dismiss(); action.onClick && action.onClick() }}>
                  {action.label}
                </button>
              )}
            </div>
            : null }
        </div>
      </div>
    </div>
  }

  dismiss () {
    const { onDismiss } = this.props

    onDismiss && onDismiss()

    this.setState({
      isDismissed: true
    })
  }
}

export default connect(
  (state: StoreState, props: any) => ({
    isDismissed: Settings.full(state)[`toast:${props.id}`] || false
  }),
  (dispatch: Dispatch<*>, props: any) => ({
    onDismiss: () => {
      dispatch({
        type: 'settings:update',
        payload: {
          [`toast:${props.id}`]: true
        }
      })
    }
  })
)(ToastBase)
