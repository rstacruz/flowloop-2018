/* @flow */

import React from 'react'
import ToastBase from './toast_base'

/**
 * A welcome notification for new users
 */

export default function WelcomeToast () {
  return <ToastBase
    id='welcome'
    actions={[
      { label: 'Learn more', onClick: openSite },
      { label: 'Dismiss', className: '-mute' }
    ]}>
    {/* <h2>Let's get productive</h2> */}
    <p>Flowloop is a productivity timer that helps you maintain a state of flow.</p>
  </ToastBase>
}

/*
 * Opens the site
 */

function openSite () {
  window.open('https://github.com/rstacruz/flowloop#readme', '_blank')
}
