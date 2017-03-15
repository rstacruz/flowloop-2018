/* eslint-env jest */
import App from '../app'

let app

beforeEach(() => {
  app = new App({ env: 'test' })
  app.start()
})

afterEach(() => {
  app.stop()
})

describe('App', () => {
  test('starts and dies flawlessly', () => {
    expect(1).toEqual(1)
  })

  test('drops the right HTML', () => {
    expect(document.body.innerHTML).toMatchSnapshot()
  })

  test('Empty timer', () => {
    app.store.dispatch({ type: 'router:nav!', to: '/timer' })
  })

  test('Started work timer', () => {
    app.store.dispatch({ type: 'timer:start!', timerType: 'work' })
  })

  test('Started break timer', () => {
    app.store.dispatch({ type: 'timer:start!', timerType: 'break' })
  })

  test('Empty log', () => {
    app.store.dispatch({ type: 'router:nav!', to: '/log' })
  })
})
