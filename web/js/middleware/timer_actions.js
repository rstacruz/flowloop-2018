import get from '101/pluck'

import Settings from '../selectors/settings'
import Timer from '../selectors/timer'

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
        store.dispatch({ type: 'ticker:start!' })
        store.dispatch({ type: 'icon:start!', timerType: action.timerType })
        store.dispatch({ type: 'notifier:request!' })
        store.dispatch({ type: 'timer:start', timerType: action.timerType })
        store.dispatch({ type: 'router:nav!', to: '/timer', replace: true })
        break
    }
  }
}

function checkConclusion (action, dispatch, state) {
  const lastLap = get(state, 'timer.lastLap')
  const duration = get(state, 'timer.duration')
  const now = action.now

  const settings = Settings.full(state)
  const timerMode = settings['timer:mode']

  if (+now > (+lastLap + +duration)) {
    if (timerMode === 'CONTINUOUS') {
      dispatch({ type: 'log:addCurrent' })
      dispatch({ type: 'timer:lap' })
      dispatch({ type: 'notifier:notifyLap!' })
    } else {
      dispatch({ type: 'log:addCurrent' })
      dispatch({ type: 'notifier:notifyDone!' })
      dispatch({ type: 'timer:stop!' })
    }
  }
}

function updateIcon (action, dispatch, state) {
  const timer = Timer.full(state)

  dispatch({ type: 'icon:update!', progress: timer.progress })
}
