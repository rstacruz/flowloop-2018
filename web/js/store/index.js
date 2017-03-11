import put from '101/put'

export default function reducer (state, action) {
  switch (action.type) {
    case 'route:change':
      return put(state, {
        'route': action
      })

    default:
      return state
  }
}
