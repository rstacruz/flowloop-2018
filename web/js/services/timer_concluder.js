import get from '101/pluck'

export default function TimerConcluder () {
  return store => dispatch => action => {
    if (action.type === 'ticker:tick') {
      checkConclusion(action, dispatch, store.getState())
    }

    return dispatch(action)
  }
}

function checkConclusion (action, dispatch, state) {
  const startedAt = get(state, 'timer.startedAt')
  const duration = get(state, 'timer.duration')
  const now = get(state, 'time.now')

  if (+now > (+startedAt + +duration)) {
    // dispatch({ type: 'timer:store' }) // TODO
    dispatch({ type: 'router:nav!', to: '/timer/stop' })

    // or:
    // dispatch({ type: 'timer:lap' }) // TODO
  }
}
