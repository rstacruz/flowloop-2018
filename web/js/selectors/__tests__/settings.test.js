/* eslint-env jest */
import Settings from '../settings'

test('sets defaults', () => {
  const settings = Settings.full({
    settings: {}
  })

  expect(settings['labels:default']).toEqual('Work')
})

test('allows overriding', () => {
  const settings = Settings.full({
    settings: {
      'labels:default': 'Trabajo'
    }
  })

  expect(settings['labels:default']).toEqual('Trabajo')
})
