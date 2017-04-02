/* @flow */

import leftPad from 'left-pad'

/**
 * Renders a duration in milliseconds into a string
 * @example
 *
 *     numeric(2000) => '0:02'
 */

export function numeric (
  ms /*: number */,
  isRemaining /*: ?boolean */) {
  let { sign, hours, mins, secs } = parse(ms, isRemaining)

  if (hours > 0) {
    return `${sign}${hours}:${pad(mins)}:${pad(secs)}`
  } else {
    return `${sign}${mins}:${pad(secs)}`
  }
}

export default numeric

/**
 * Renders a duration in milliseconds into a string
 * @example
 *
 *     letters(122000) => '2m'
 */

export function letters (
  ms /*: number */,
  isRemaining /*: ?boolean */) {
  if (ms > 60000) ms = Math.round(ms / 60000) * 60000

  let { sign, hours, mins, secs } = parse(ms, isRemaining)

  let result = []

  if (hours > 0) result = [...result, `${hours}h`]
  if (mins > 0) result = [...result, `${mins}m`]
  if (hours === 0 && mins === 0) result = [...result, `${secs}s`]

  return `${sign}${result.join(' ')}`
}

/**
 * Renders a duration in milliseconds into an object.
 * Used internally by `numeric()`.
 * @example
 *
 *     parse(62000) => { sign: '', hours: 0, mins: 1, secs: 2 }
 */

export function parse (
  ms /*: number */,
  isRemaining /*: ?boolean */
) {
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

  return { sign, hours, mins, secs }
}

/**
 * Helper for left-padding with zero
 * @private
 */

function pad (num /*: number */) {
  return leftPad(num.toString(), 2, '0')
}
