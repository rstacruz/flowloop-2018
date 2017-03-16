/* @flow  */

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
  let mins, secs
  let positive = ms >= 0

  ms = Math.abs(ms)
  secs = (ms / 1000)
  secs = isRemaining ? Math.ceil(secs) : Math.floor(secs)
  mins = (secs / 60) | 0
  secs -= mins * 60

  let secsPadded = leftPad(secs.toString(), 2, '0')
  let sign = positive ? '' : '-'

  return `${sign}${mins}:${secsPadded}`
}
