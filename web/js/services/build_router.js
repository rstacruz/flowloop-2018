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
 *     store.dispatch({ type: 'route:nav', to: '/' })
 *     store.dispatch({ type: 'route:nav', to: '/', replace: true })
 */

export default function buildRouter (options = {}, addRoutes) {
  const ACTION_NAME = options.action || 'route:nav'

  /*
   * Redux middleware
   */

  return function routerMiddleware (store) {
    addRoutes({ route, store, dispatch: store.dispatch })
    setTimeout(() => { route.start(true) })

    return function (dispatch) {
      return function (action) {
        if (action.type === ACTION_NAME) {
          const url = UrlTemplate.parse(action.to).expand(action)

          if (action.replace) {
            route(url, null, true)
          } else {
            route(url)
          }
        } else {
          return dispatch(action)
        }
      }
    }
  }
}
