import Piecon from 'piecon'
import debounce from 'debounce'
import Debug from 'debug'
import * as Timer from '../selectors/timer'
import * as Label from '../selectors/label'

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

const setProgress = debounce(progress => {
  debug('Update progress', progress)
  Piecon.setProgress(progress)
}, 5000, true)

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
