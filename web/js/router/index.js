import buildRouter from './build_router'

/*
 * Returns Redux middleware
 */

export default function Router () {
  return buildRouter({}, ({ route, dispatch }) => {
    route('/', () => {
      dispatch({ type: 'route:change', page: 'HomeIndex' })
    })

    route('/timer/*', (timerType) => {
      dispatch({ type: 'timer:start', timerType: timerType })
      setTimeout(() => { dispatch({ type: 'route:nav', to: '/timer', replace: true }) })
    })

    route('/timer', () => {
      dispatch({ type: 'route:change', page: 'TimerShow' })
    })
  })
}
