import { buildStore } from '../index'

let DATE = new Date('2010-09-02T00:00:00Z')
let store

describe('with side effects', () => {
  beforeEach(() => {
    store = buildStore()
  })

  test('returns a Redux store', () => {
    expect(typeof store.getState).toEqual('function')
    expect(typeof store.subscribe).toEqual('function')
  })
})

describe('without side effects', () => {
  beforeEach(() => {
    store = buildStore([])
  })

  test('builds the right data', () => {
    store.dispatch({ type: 'init' })
    let state = store.getState()

    expect(typeof state.timer).toEqual('object')
    expect(typeof state.time).toEqual('object')
    expect(typeof state.route).toEqual('object')
    expect(typeof state.settings).toEqual('object')
    expect(typeof state.log).toEqual('object')
  })

  test('ticker:tick', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })

    let state = store.getState()
    expect(state.time).toMatchSnapshot()
  })

  test('route:change', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'route:change', page: 'HomeIndex' })

    let state = store.getState()
    expect(state.route).toMatchSnapshot()
  })

  test('timer:start', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })

    let state = store.getState()
    expect(state.timer).toMatchSnapshot()
    expect(state.timer.startedAt).toEqual(DATE)
  })

  test('timer:start break', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'break' })

    let state = store.getState()
    expect(state.timer).toMatchSnapshot()
    expect(state.timer.startedAt).toEqual(DATE)
  })

  test('timer:halt', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })
    store.dispatch({ type: 'timer:halt' })

    let state = store.getState()
    expect(state.timer.active).toEqual(false)
  })

  test('log:addCurrent', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'log:load', payload: {
      a: {
        id: 'a',
        startedAt: '2010-02-04T10:00:00Z',
        endedAt: '2010-02-04T10:30:00Z'
      }
    } })

    let state = store.getState()
    expect(typeof state.log.a).toEqual('object')
    expect(state.log.a.startedAt.constructor).toEqual(Date)
    expect(state.log.a.endedAt.constructor).toEqual(Date)
  })

  test('log:addCurrent', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })
    store.dispatch({ type: 'log:addCurrent' })

    let state = store.getState()
    expect(state.timer.lastLap).toEqual(DATE)

    let keys = Object.keys(state.log)
    expect(keys.length).toEqual(1)
    expect(state.log[keys[0]].id).toEqual(keys[0])
  })

  test('settings:update', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'settings:update', payload: {
      duration: { work: 25 }
    } })
    store.dispatch({ type: 'settings:update', payload: {
      duration: { break: 5 }
    } })

    let state = store.getState()
    expect(state.settings.duration.work).toEqual(25)
    expect(state.settings.duration.break).toEqual(5)
  })
})
