import App from '../app'

let app

beforeEach(() => {
  app = new App()
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
})
