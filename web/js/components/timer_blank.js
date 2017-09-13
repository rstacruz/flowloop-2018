/* @flow */

/*::
  type Props = {
    onHome: () => void
  }
*/

import React from 'react'
import Title from 'react-document-title'

import TimerLayout from '../components/timer_layout'

/**
 * When no timer is active, but you visit /#timer
 */

export default function TimerBlank ({ onHome } /*: Props */) {
  return <TimerLayout>
    <Title title='No timer' />

    <div className='timer-heading'>
      No timer active.
    </div>

    <div className='timer-spacer' />

    <div className='timer-actions'>
      <button
        className='timer-button button -back'
        onClick={() => onHome()}>
        Back
      </button>
    </div>
  </TimerLayout>
}
