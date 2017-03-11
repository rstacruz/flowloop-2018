import buildRouter from './build_router'

/*
 * Returns Redux middleware
 */

export default function Router () {
  return buildRouter({}, ({ route, dispatch }) => {
    route('/', () => {
      dispatch({ type: 'route:change', page: 'HomeIndex' })
    })

    // TODO: move these to timer actions
    route('/timer/stop', (timerType) => {
      dispatch({ type: 'timer:stop!' })
    })

    route('/timer/*', (timerType) => {
      dispatch({ type: 'timer:start!', timerType })
    })

    route('/timer', () => {
      dispatch({ type: 'route:change', page: 'TimerShow' })
    })
  })
}
