import leftPad from 'left-pad'

export default function timerDisplay (ms, isRemaining) {
  let mins, secs
  let positive = ms >= 0

  ms = Math.abs(ms)
  secs = (ms / 1000)
  secs = isRemaining ? Math.ceil(secs) : Math.floor(secs)
  mins = (secs / 60) | 0
  secs -= mins * 60

  let secsPadded = leftPad(secs, 2, '0')
  let sign = positive ? '' : '-'

  return `${sign}${mins}:${secsPadded}`
}
