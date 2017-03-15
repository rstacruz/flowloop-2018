import buildReducer from 'build-reducer'
import put from '101/put'

/*
 * Route
 */

export default buildReducer({
  'init': (state) => {
    return put(state, {
      'route.page': undefined
    })
  },

  'route:change': (state, { page }) => {
    return put(state, {
      'route': { page }
    })
  }
})
