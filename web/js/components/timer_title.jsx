/* @flow */

/*::
  import type { FullTimer } from '../selectors/timer'

  type Props = {
    timer: FullTimer
  }
*/

import React from 'react'
import Title from 'react-document-title'

import ms from '../helpers/timer_display'

/**
 * Document title for timer page
 */

export default function TimerTitle ({ timer } /*: Props */) {
  const { remaining, isOvertime, elapsed, labelText } = timer

  if (isOvertime) {
    return <Title title={`[${timer.laps}] ${ms(elapsed)} • ${labelText}`} />
  } else {
    return <Title title={`${ms(remaining, true)} • ${labelText}`} />
  }
}
