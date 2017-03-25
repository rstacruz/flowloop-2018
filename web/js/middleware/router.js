import buildRouter from './build_router'

/*
 * Returns Redux middleware
 */

export default function Router () {
  return buildRouter({}, ({ route, dispatch, store }) => {
    route('/', () => {
      dispatch({ type: 'route:change', page: 'HomeIndex' })
    })

    route('/timer', () => {
      const timer = store.getState().timer
      if (timer && timer.active) {
        dispatch({ type: 'route:change', page: 'TimerShow' })
      } else {
        setTimeout(() => { route('/', null, true) })
      }
    })

    route('/log', () => {
      dispatch({ type: 'route:change', page: 'LogIndex' })
    })

    route('/settings', () => {
      dispatch({ type: 'route:change', page: 'SettingsIndex' })
    })

    route('/timer/work', () => {
      setTimeout(() => {
        dispatch({ type: 'timer:start!', timerType: 'work' })
      })
    })
  })
}
