export default function Notifier () {
  return store => dispatch => action => {
    switch (action.type) {
      case 'notifier:request!':
        console.log('reqeust perm')
        window.Notification.requestPermission(p => {})
        break

      case 'notifier:notifyDone!':
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
