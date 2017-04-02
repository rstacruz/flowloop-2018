import Piecon from 'piecon'
import Debug from 'debug'

const debug = Debug('app:icon')

const COLORS = {
  bg: '#ddd',
  secondary: '#fff',
  accent: '#42a5f5'
}

/**
 * Debounced version of Piecon.setProgress()
 * Canvas calls can be expensive!
 */

const setProgress = progress => {
  debug('Update progress', progress)
  Piecon.setProgress(progress)
}

/**
 * Redux middleware generator
 */

export default function Icon () {
  return store => dispatch => action => {
    const result = dispatch(action)

    switch (action.type) {
      case 'stop!':
      case 'icon:reset!':
        Piecon.reset()
        break

      case 'icon:start!':
        break

      case 'icon:update!':
        if (!isNaN(action.progress)) {
          if (action.timerType === 'work') {
            setStyle(action.color || COLORS.accent)
          } else {
            setStyle(COLORS.secondary)
          }
          setProgress((1 - action.progress) * 100)
        }

        break
    }

    return result
  }
}

/**
 * Updates the color of Piecon.
 * @private
 */

function setStyle (color) {
  Piecon.setOptions({
    color,
    background: COLORS.bg,
    shadow: COLORS.bg
  })
}
