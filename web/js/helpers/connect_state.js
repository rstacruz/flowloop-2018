/*::
  type State = ?Object
  type mapStateToProps = (State) => Object
  type SetState = (State) => void
  type mapSetStateToProps = (SetState, Object) => Object
*/

import React from 'react'

/**
 * Adds state to a stateless component.
 * @param {Function} mapStateToProps Maps the state object to props
 * @param {Function} mapSetStateToProps Maps the setState function and existing props to props
 * @example
 *
 *     function StatelessComponent (props) {
 *       const { onOpen, open } = props
 *
 *       return <div>
 *         <button onClick={onOpen}>Open</button>
 *         { open ? <div>Hello!</div> : null }
 *       </div>
 *     }
 *
 * The properties `onOpen` and `open` are given using the state connector using
 * the code below.
 *
 *     const StatefulComponent = connectState(
 *       // `state` is the state object (starts as `{}`).
 *       // The resulting object will be passed as props to the
 *       // wrapped component.
 *       state => ({
 *         open: state.open || false
 *       }),
 *
 *       // `setState` is a function that updates the `state`.
 *       // `props` is the current properties of the component,
 *       // including the result of mapStateToProps() above.
 *       // The resulting object will be passed as props to the
 *       // wrapped component.
 *       (setState, props) => ({
 *         onOpen: () => { setState({ open: !props.open }) }
 *       })
 *     )(StatelessComponent)
 */

export default function connectState (mapStateToProps, mapSetStateToProps) {
  return function (Component) {
    class StateConnector extends React.Component {
      constructor () {
        super()
        this.state = {}
      }

      render () {
        const stateProps = mapStateToProps(this.state)

        let props = {
          ...this.props,
          ...stateProps
        }

        const setStateProps = mapSetStateToProps(this.setState.bind(this), props)

        props = { ...props, ...setStateProps }

        return <Component {...props} />
      }
    }

    StateConnector.WrappedComponent = Component
    StateConnector.displayName = `State(${Component.displayName || Component.name || ''})`

    return StateConnector
  }
}
