import { buildStore } from '../index'

test('returns a Redux store', () => {
  const store = buildStore()
  expect(typeof store.getState).toEqual('function')
  expect(typeof store.subscribe).toEqual('function')
})
