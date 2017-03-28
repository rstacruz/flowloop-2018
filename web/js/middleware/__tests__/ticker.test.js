/* eslint-env jest */

import Ticker from '../ticker'
import capture from '../../../../test/support/capture'

jest.useFakeTimers()

describe('Ticker', () => {
  test('runs ticker:tick on init', () => {
    const { actions, store } = capture(Ticker())

    store.dispatch({ type: 'init' })
    expect(actions[1]).toEqual({ type: 'init' })
    expect(actions[2].type).toEqual('ticker:tick')
    expect(actions[2].now.constructor).toEqual(Date)
  })

  test('runs ticker:tick when starting', () => {
    const { actions, store } = capture(Ticker())

    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:start!' })
    jest.runOnlyPendingTimers()

    store.dispatch({ type: 'ticker:stop!' })
    expect(actions[3].type).toEqual('ticker:start!')
    expect(actions[4].type).toEqual('ticker:tick')
    expect(actions[4].now.constructor).toEqual(Date)
  })
})
