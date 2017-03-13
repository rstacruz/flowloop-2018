import get from '101/pluck'

export default function TimerActions () {
  return store => dispatch => action => {
    dispatch(action)

    switch (action.type) {
      case 'ticker:tick':
        updateIcon(action, store.dispatch, store.getState())
        checkConclusion(action, store.dispatch, store.getState())
        break

      case 'timer:stop!':
        store.dispatch({ type: 'icon:reset!' })
        store.dispatch({ type: 'timer:halt' })
        store.dispatch({ type: 'ticker:stop!' })
        store.dispatch({ type: 'router:nav!', to: '/', replace: true })
        break

      case 'timer:start!':
        store.dispatch({ type: 'icon:start!', timerType: action.timerType })
        store.dispatch({ type: 'notifier:request!' })
        store.dispatch({ type: 'timer:start', timerType: action.timerType })
        store.dispatch({ type: 'ticker:start!' })
        store.dispatch({ type: 'router:nav!', to: '/timer', replace: true })
        break
    }
  }
}

function checkConclusion (action, dispatch, state) {
  const startedAt = get(state, 'timer.startedAt')
  const duration = get(state, 'timer.duration')
  const now = action.now

  if (+now > (+startedAt + +duration)) {
    dispatch({ type: 'log:addCurrent' })
    dispatch({ type: 'notifier:notifyDone!' })
    dispatch({ type: 'timer:stop!' })
  }
}

function updateIcon (action, dispatch, state) {
  const now = action.now
  const startedAt = get(state, 'timer.startedAt')
  const duration = get(state, 'timer.duration')
  const remaining = (+startedAt + duration) - now
  const progress = Math.max(remaining / duration, 0)

  dispatch({ type: 'icon:update!', progress })
}
