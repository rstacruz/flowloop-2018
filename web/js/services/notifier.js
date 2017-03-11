import ding from '../helpers/ding'

export default function Notifier () {
  return store => dispatch => action => {
    switch (action.type) {
      case 'notifier:request!':
        console.log('Notifier: requesting permissions')
        window.Notification.requestPermission(p => {})
        break

      case 'notifier:notifyDone!':
        ding()
        const notif = new window.Notification('Timer done', {
          body: 'That was quick.',
          // icon: ''
        })
        // notif.onclick = () => {...}
        break
    }

    return dispatch(action)
  }
}
