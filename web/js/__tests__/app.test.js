/* eslint-env jest */
import App from '../app'
import MockDate from 'mockdate'
import pretty from 'pretty'

let app

beforeEach(() => {
  MockDate.set('4/20/2010')
  app = new App({ env: 'test' })
  app.start()
})

afterEach(() => {
  MockDate.reset()
  app.stop()
})

describe('App', () => {
  test('starts and dies flawlessly', () => {
    expect(1).toEqual(1)
  })

  test('drops the right HTML', () => {
    expect(pretty(document.body.innerHTML)).toMatchSnapshot()
  })

  test('Empty timer', () => {
    app.store.dispatch({ type: 'router:nav!', to: '/timer' })
    return delay(next => {
      expect(pretty(document.body.innerHTML)).toMatchSnapshot()
      next()
    })
  })

  test('Started work timer', () => {
    app.store.dispatch({ type: 'timer:start!', timerType: 'work' })
    return delay(next => {
      expect(pretty(document.body.innerHTML)).toMatchSnapshot()
      next()
    })
  })

  test('Started break timer', () => {
    app.store.dispatch({ type: 'timer:start!', timerType: 'break' })
    return delay(next => {
      expect(pretty(document.body.innerHTML)).toMatchSnapshot()
      next()
    })
  })

  test('Empty log', () => {
    app.store.dispatch({ type: 'router:nav!', to: '/log' })
    return delay(next => {
      expect(pretty(document.body.innerHTML)).toMatchSnapshot()
      next()
    })
  })
})

/*
 * Wait for setTimeouts to kick in before running assertions
 */

function delay (fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { fn(resolve) })
  })
}
