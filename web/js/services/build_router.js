import route from 'riot-route'
import UrlTemplate from 'url-template'

/**
 * Creates a router as redux middleware.
 *
 *     const wares = [
 *       makeRouter({}, ({route, dispatch}) => {
 *         route('/', () => {
 *           dispatch({ type: 'navigate', view: 'PageIndex' })
 *         })
 *       })
 *     ]
 *
 *     const store = createStore(reducer, {}, applyMiddleware(...wares))
 *
 *     store.dispatch({ type: 'router:nav!', to: '/' })
 *     store.dispatch({ type: 'router:nav!', to: '/', replace: true })
 */

export default function buildRouter (options = {}, addRoutes) {
  const ACTION_NAME = options.action || 'router:nav!'
  const ACTION_STOP = options.stopAction || 'stop!'

  /*
   * Redux middleware
   */

  return function routerMiddleware (store) {
    addRoutes({ route, store, dispatch: store.dispatch })
    setTimeout(() => { route.start(true) })

    return function (dispatch) {
      return function (action) {
        dispatch(action)

        if (action.type === ACTION_NAME) {
          const url = UrlTemplate.parse(action.to).expand(action)

          if (action.back) {
            if (window.history.length > 1) {
              window.history.go(-1)
            } else {
              route(url)
            }
          } else if (action.replace) {
            route(url, null, true)
          } else {
            route(url)
          }
        } else if (action.type === ACTION_STOP) {
          route.stop()
        }
      }
    }
  }
}
