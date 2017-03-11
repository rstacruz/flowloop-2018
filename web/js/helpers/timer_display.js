import leftPad from 'left-pad'

export default function timerDisplay (ms) {
  let mins, secs
  let positive = ms >= 0

  ms = Math.abs(ms)
  secs = (ms / 1000) | 0
  mins = (secs / 60) | 0
  secs -= mins * 60

  let secsPadded = leftPad(secs, 2, '0')
  let sign = positive ? '' : '-'

  return `${sign}${mins}:${secsPadded}`
}
