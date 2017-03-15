import buildReducer from 'build-reducer'
import put from '101/put'

/*
 * Time
 */

export default buildReducer({
  'init': state => {
    return put(state, {
      'time.now': undefined
    })
  },

  'ticker:tick': (state, { now }) => {
    return put(state, {
      'time.now': now
    })
  }
})
