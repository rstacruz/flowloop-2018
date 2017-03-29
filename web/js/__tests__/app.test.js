/* eslint-env jest */
import App from '../app'
import MockDate from 'mockdate'
import pretty from 'pretty'

jest.useFakeTimers()

let app

beforeEach(() => {
  MockDate.set('4/20/2010', 120)
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
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()
    expect(pretty(document.body.innerHTML)).toMatchSnapshot()
  })

  test('Started work timer', () => {
    app.store.dispatch({ type: 'timer:start!', timerType: 'work' })
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()
    expect(pretty(document.body.innerHTML)).toMatchSnapshot()
  })

  test('Started break timer', () => {
    app.store.dispatch({ type: 'timer:start!', timerType: 'break' })
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()
    expect(pretty(document.body.innerHTML)).toMatchSnapshot()
  })

  test('Empty log', () => {
    app.store.dispatch({ type: 'router:nav!', to: '/log' })
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()
    expect(pretty(document.body.innerHTML)).toMatchSnapshot()
  })
})
