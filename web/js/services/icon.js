import Piecon from 'piecon'

const COLORS = {
  bg: '#ddd',
  secondary: '#fff',
  accent: '#42a5f5'
}

export default function Icon () {
  return store => dispatch => action => {
    switch (action.type) {
      case 'icon:reset!':
        Piecon.reset()
        break

      case 'icon:start!':
        if (action.timerType === 'work') {
          Piecon.setOptions({
            color: COLORS.accent,
            background: COLORS.bg,
            shadow: COLORS.bg,
          })
        } else {
          Piecon.setOptions({
            color: COLORS.secondary,
            background: COLORS.bg,
            shadow: COLORS.bg,
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