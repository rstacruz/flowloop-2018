import Piecon from 'piecon'
import throttle from 'lodash.throttle'
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

const setProgress = throttle(progress => {
  debug('Update progress', progress)
  Piecon.setProgress(progress)
}, 6000)

/**
 * Redux middleware generator
 */

export default function Icon () {
  return store => dispatch => action => {
    dispatch(action)

    switch (action.type) {
      case 'stop!':
      case 'icon:reset!':
        Piecon.reset()
        break

      case 'icon:start!':
        if (action.timerType === 'work') {
          setWorkStyle()
        } else {
          setBreakStyle()
        }
        break

      case 'icon:update!':
        if (!isNaN(action.progress)) {
          setProgress((1 - action.progress) * 100)
        }

        break
    }
  }
}

function setWorkStyle () {
  Piecon.setOptions({
    color: COLORS.accent,
    background: COLORS.bg,
    shadow: COLORS.bg
  })
}

function setBreakStyle () {
  Piecon.setOptions({
    color: COLORS.secondary,
    background: COLORS.bg,
    shadow: COLORS.bg
  })
}
