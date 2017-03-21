/* eslint-env jest */
import { buildStore } from '../index'
import Settings from '../../selectors/settings'
import values from 'object-loops/values'

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
    store.dispatch({
      type: 'settings:update',
      payload: { 'duration:work': 25 }
    })
    store.dispatch({ type: 'timer:start', timerType: 'work' })

    let state = store.getState()
    expect(state.timer).toMatchSnapshot()
    expect(state.timer.startedAt).toEqual(DATE)
    expect(state.timer.duration).toEqual(25)
  })

  test('timer:start break', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'break' })

    let state = store.getState()
    expect(state.timer).toMatchSnapshot()
    expect(state.timer.startedAt).toEqual(DATE)
  })

  test('timer:lap', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })
    store.dispatch({ type: 'timer:lap' })

    let state = store.getState()
    expect(state.timer).toMatchSnapshot()
  })

  test('timer:lap 2x', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })
    store.dispatch({ type: 'timer:lap' })
    store.dispatch({ type: 'timer:lap' })

    let state = store.getState()
    expect(state.timer).toMatchSnapshot()
  })

  test('timer:halt', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })
    store.dispatch({ type: 'timer:halt' })

    let state = store.getState()
    expect(state.timer.active).toEqual(false)
  })

  test('timer:setLabelId', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({ type: 'timer:start', timerType: 'work' })
    store.dispatch({ type: 'timer:setLabelId', id: '_hello' })

    let state = store.getState()
    expect(state.timer.labelId).toEqual('_hello')
    expect(state.settings['labels:default']).toEqual('_hello')
  })

  test('log:load', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({
      type: 'log:load',
      payload: {
        a: {
          id: 'a',
          startedAt: '2010-02-04T10:00:00Z',
          endedAt: '2010-02-04T10:30:00Z'
        }
      }
    })

    let state = store.getState()
    expect(typeof state.log.a).toEqual('object')
    expect(state.log.a.startedAt.constructor).toEqual(Date)
    expect(state.log.a.endedAt.constructor).toEqual(Date)
  })

  test('log:clear', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({
      type: 'log:load',
      payload: {
        a: {
          id: 'a',
          startedAt: '2010-02-04T10:00:00Z',
          endedAt: '2010-02-04T10:30:00Z'
        }
      }
    })
    store.dispatch({ type: 'log:clear' })

    let state = store.getState()
    expect(state.log).toMatchSnapshot()
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

    let id = state.log[keys[0]].id
    expect(state.timer.lastLogId).toEqual(id)
  })

  test('settings:update', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({
      type: 'settings:update',
      payload: { 'duration:work': 25 }
    })
    store.dispatch({
      type: 'settings:update',
      payload: { 'duration:break': 5 }
    })

    let state = store.getState()
    expect(state.settings['duration:work']).toEqual(25)
    expect(state.settings['duration:break']).toEqual(5)
  })

  test('settings:reset', () => {
    store.dispatch({ type: 'init' })
    store.dispatch({
      type: 'settings:update',
      payload: { 'duration:work': 25 }
    })
    store.dispatch({ type: 'settings:reset' })

    let state = store.getState()
    expect(state.settings).toMatchSnapshot()
  })

  test('settings:cycleTimerMode', () => {
    let state

    store.dispatch({ type: 'init' })
    store.dispatch({
      type: 'settings:update',
      payload: {
        'settings.timer:mode': 'CONTINUOUS'
      }
    })

    store.dispatch({ type: 'settings:cycleTimerMode' })
    state = store.getState()
    expect(state.settings['timer:mode']).toEqual('SINGLE')

    store.dispatch({ type: 'settings:cycleTimerMode' })
    state = store.getState()
    expect(state.settings['timer:mode']).toEqual('ALTERNATE')

    store.dispatch({ type: 'settings:cycleTimerMode' })
    state = store.getState()
    expect(state.settings['timer:mode']).toEqual('CONTINUOUS')
  })

  test('labels init', () => {
    let state

    store.dispatch({ type: 'init' })
    state = store.getState()
    expect(state.labels).toMatchSnapshot()
  })

  test('labels:load', () => {
    let state

    store.dispatch({
      type: 'labels:load',
      payload: {
        '_foo': {
          id: '_foo',
          name: 'Foo',
          color: 'red'
        }
      }
    })

    state = store.getState()
    expect(state.labels).toMatchSnapshot()
  })

  test('label:update', () => {
    let state

    store.dispatch({ type: 'init' })
    store.dispatch({
      type: 'label:update',
      id: '_foo',
      payload: {
        id: '_foo',
        name: 'Foo',
        color: 'red'
      }
    })

    state = store.getState()
    expect(state.labels._foo).toMatchSnapshot()
  })

  test('label:create', () => {
    let state, keys, label

    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'label:create' })

    state = store.getState()
    keys = Object.keys(state.labels)
    label = state.labels[keys[keys.length - 1]]

    expect(keys.length).toMatchSnapshot()
    expect(label.name).toMatchSnapshot()
    expect(label.color).toMatchSnapshot()

    store.dispatch({ type: 'label:create' })

    state = store.getState()
    keys = Object.keys(state.labels)
    label = state.labels[keys[keys.length - 1]]

    expect(keys.length).toMatchSnapshot()
    expect(label.name).toMatchSnapshot()
    expect(label.color).toMatchSnapshot()
  })

  test('label:delete', () => {
    let state, keys, id, items

    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'label:create' })

    state = store.getState()
    keys = Object.keys(state.labels)
    id = keys[keys.length - 1]

    store.dispatch({ type: 'label:delete', id })

    state = store.getState()
    items = values(state.labels).filter(Boolean)

    expect(items.length).toMatchSnapshot()
    expect(state.labels[id]).toEqual(null)
  })

  test('label:delete all', () => {
    let state, keys, items

    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'label:create' })

    state = store.getState()
    keys = Object.keys(state.labels)
    keys.forEach(id => {
      store.dispatch({ type: 'label:delete', id })
    })

    state = store.getState()
    items = values(state.labels).filter(Boolean)

    expect(items.length).toEqual(0)
  })

  test('label:delete current timer label', () => {
    let state, keys, id, settings

    // Start a timer
    store.dispatch({ type: 'init' })
    store.dispatch({ type: 'ticker:tick', now: DATE })
    store.dispatch({
      type: 'settings:update',
      payload: { 'duration:work': 25 }
    })
    store.dispatch({ type: 'timer:start', timerType: 'work' })

    // Create a label
    store.dispatch({ type: 'label:create' })

    state = store.getState()
    keys = Object.keys(state.labels).filter(Boolean)
    id = keys[keys.length - 1]

    // Use it
    store.dispatch({ type: 'timer:setLabelId', id })

    state = store.getState()
    expect(state.timer.labelId).toEqual(id)

    // Delete it
    store.dispatch({ type: 'label:delete', id })

    // Expect the following to revert to default:
    // - current timer label
    // - default label settings
    state = store.getState()
    settings = Settings.full(state)
    expect(state.timer.labelId).toMatchSnapshot()
    expect(state.settings['labels:default']).toMatchSnapshot()
    expect(settings['labels:default']).toMatchSnapshot()
  })
})
