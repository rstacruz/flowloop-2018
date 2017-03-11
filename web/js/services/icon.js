import Piecon from 'piecon'

export default function Icon () {
  return store => dispatch => action => {
    switch (action.type) {
      case 'icon:reset!':
        Piecon.reset()
        break

      case 'icon:start!':
        if (action.timerType === 'work') {
          Piecon.setOptions({
            color: '#ff0084',
            background: '#bbb',
            shadow: '#bbb',
          })
        } else {
          Piecon.setOptions({
            color: '#ffffff',
            background: '#bbb',
            shadow: '#bbb',
          })
        }
        break

      case 'icon:update!':
        Piecon.setProgress(action.progress * 100)
        break
    }

    return dispatch(action)
  }
}
