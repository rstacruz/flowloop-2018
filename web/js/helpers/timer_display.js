/* @flow */

import leftPad from 'left-pad'

/**
 * Renders a duration in milliseconds into a string
 * @example
 *
 *     ms(2000) => '0:02'
 */

export default function timerDisplay (
  ms /*: number */,
  isRemaining /*: ?boolean */) {
  let mins, secs, hours
  let positive = ms >= 0

  ms = Math.abs(ms)
  secs = (ms / 1000)
  secs = isRemaining ? Math.ceil(secs) : Math.floor(secs)
  mins = (secs / 60) | 0
  secs -= mins * 60

  hours = (mins / 60) | 0
  mins -= hours * 60

  let sign = positive ? '' : '-'

  if (hours > 0) {
    return `${sign}${hours}:${pad(mins)}:${pad(secs)}`
  } else {
    return `${sign}${mins}:${pad(secs)}`
  }
}

function pad (num /*: number */) {
  return leftPad(num.toString(), 2, '0')
}
