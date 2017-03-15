import get from '101/pluck'

import ding from '../helpers/ding'

export default function Notifier () {
  return store => dispatch => action => {
    dispatch(action)

    switch (action.type) {
      case 'notifier:request!':
        try {
          window.Notification.requestPermission(p => {})
        } catch (e) { }
        break

      case 'notifier:notifyLap!':
        const laps = get(store.getState(), 'timer.laps')
        ding(laps)
        break

      case 'notifier:notifyDone!':
        ding()
        try {
          /* eslint-disable no-new */
          new window.Notification('Timer done', {
            body: 'That was quick.'
            // icon: ''
          })
          // notif.onclick = () => {...}
        } catch (e) {}
        break
    }
  }
}
