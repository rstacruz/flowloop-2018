import buildRouter from './build_router'

/*
 * Returns Redux middleware
 */

export default function Router () {
  return buildRouter({}, ({ route, dispatch }) => {
    route('/', () => {
      dispatch({ type: 'route:change', page: 'HomeIndex' })
    })

    route('/timer/stop', (timerType) => {
      dispatch({ type: 'timer:halt' })
      dispatch({ type: 'ticker:stop!' })
      setTimeout(() => { dispatch({ type: 'router:nav!', to: '/', replace: true }) })
    })

    route('/timer/*', (timerType) => {
      dispatch({ type: 'timer:halt' })
      dispatch({ type: 'timer:start', timerType: timerType })
      dispatch({ type: 'ticker:start!' })
      setTimeout(() => { dispatch({ type: 'router:nav!', to: '/timer', replace: true }) })
    })

    route('/timer', () => {
      dispatch({ type: 'route:change', page: 'TimerShow' })
    })
  })
}
