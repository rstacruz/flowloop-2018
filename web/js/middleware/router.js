import Debug from 'debug'
import buildRouter from './build_router'

const debug = Debug('app:router')

/*
 * Returns Redux middleware
 */

export default function Router () {
  return buildRouter({}, ({ route, dispatch, store }) => {
    route('/', () => {
      debug('Navigating to HomeIndex')
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

    // This is not linked anywhere; it's mostly for debugging
    route('/timer/work', () => {
      setTimeout(() => {
        dispatch({ type: 'timer:start!', timerType: 'work' })
      })
    })

    // Catch all
    route('*', () => {
      setTimeout(() => { route('/', null, true) })
    })
  })
}
