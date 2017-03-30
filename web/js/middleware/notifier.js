/* eslint-disable no-new */

import ding from '../helpers/ding'
import { full } from '../selectors/timer'
import ms from '../helpers/timer_display'

const Notification = window.Notification

export default function Notifier () {
  return store => dispatch => action => {
    dispatch(action)

    switch (action.type) {
      case 'notifier:request!':
        try {
          Notification.requestPermission(p => {})
        } catch (e) { }
        break

      case 'notifier:notifyLap!':
        const state = store.getState()
        const timer = full(state)
        const laps = timer.laps
        new Notification(
          `${laps} ${laps === 1 ? 'lap' : 'laps'} done!`,
          { body: `${ms(timer.elapsed)} elapsed for ${timer.labelText}.` }
        )
        ding(laps)
        break

      // Just play the sound
      case 'notifier:testSound!':
        ding(action.count || 1)
        break

      case 'notifier:notifyDone!':
        ding()
        try {
          new Notification('Timer done', {
            body: 'That was quick.'
          })
        } catch (e) {}
        break
    }
  }
}
