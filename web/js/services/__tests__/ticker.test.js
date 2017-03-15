/* eslint-env jest */
import Ticker from '../ticker'
import capture from '../../../../test/support/capture'

describe('Ticker', () => {
  test('runs ticker:tick on init', () => {
    const { actions, store } = capture(Ticker())

    store.dispatch({ type: 'init' })
    expect(actions[1]).toEqual({ type: 'init' })
    expect(actions[2].type).toEqual('ticker:tick')
    expect(actions[2].now.constructor).toEqual(Date)
  })

  test('runs ticker:tick when starting', () => {
    return new Promise((resolve, reject) => {
      const { actions, store } = capture(Ticker({ interval: 1 }))

      store.dispatch({ type: 'init' })
      store.dispatch({ type: 'ticker:start!' })

      setTimeout(() => {
        store.dispatch({ type: 'ticker:stop!' })
        expect(actions[3].type).toEqual('ticker:start!')
        expect(actions[4].type).toEqual('ticker:tick')
        expect(actions[4].now.constructor).toEqual(Date)
        resolve()
      }, 5)
    })
  })
})
