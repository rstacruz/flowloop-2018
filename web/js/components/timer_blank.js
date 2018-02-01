/* @flow */

import React from 'react'
import Title from 'react-document-title'

import TimerLayout from '../components/timer_layout'

type Props = {
  onHome: () => void
}

/**
 * When no timer is active, but you visit /#timer
 */

export default function TimerBlank (props: Props) {
  return (
    <TimerLayout>
      <Title title='No timer' />

      <div className='timer-heading'>No timer active.</div>

      <div className='timer-spacer' />

      <Actions {...props} />
    </TimerLayout>
  )
}

/**
 * timer-actions
 */

function Actions ({ onHome }: Props) {
  return (
    <div className='timer-actions'>
      <button className='timer-button button -back' onClick={() => onHome()}>
        Back
      </button>
    </div>
  )
}
