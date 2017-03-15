import React from 'react'
import Title from 'react-document-title'

import ms from '../helpers/timer_display'

/**
 * Document title for timer page
 */

export default function TimerTitle ({ timer }) {
  const { remaining, isOvertime, elapsed, trueLabel } = timer

  if (isOvertime) {
    return <Title title={`[${timer.laps}] ${ms(elapsed)} • ${trueLabel}`} />
  } else {
    return <Title title={`${ms(remaining, true)} • ${trueLabel}`} />
  }
}
