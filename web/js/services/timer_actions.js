import get from '101/pluck'

export default function TimerActions () {
  return store => dispatch => action => {
    switch (action.type) {
      case 'ticker:tick':
        checkConclusion(action, store.dispatch, store.getState())
        break

      case 'timer:stop!':
        store.dispatch({ type: 'timer:halt' })
        store.dispatch({ type: 'ticker:stop!' })
        store.dispatch({ type: 'router:nav!', to: '/', replace: true })
        break

      case 'timer:start!':
        store.dispatch({ type: 'timer:start', timerType: action.timerType })
        store.dispatch({ type: 'ticker:start!' })
        store.dispatch({ type: 'router:nav!', to: '/timer', replace: true })
        break
    }

    return dispatch(action)
  }
}

function checkConclusion (action, dispatch, state) {
  const startedAt = get(state, 'timer.startedAt')
  const duration = get(state, 'timer.duration')
  const now = action.now

  if (+now > (+startedAt + +duration)) {
    // dispatch({ type: 'timer:store' }) // TODO
    dispatch({ type: 'timer:stop!' })

    // or:
    // dispatch({ type: 'timer:lap' }) // TODO
  }
}
