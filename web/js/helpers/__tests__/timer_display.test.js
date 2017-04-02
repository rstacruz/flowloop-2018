/* eslint-env jest */
import { numeric, letters } from '../timer_display'

test('numeric works', () => {
  expect(numeric(-1000)).toEqual('-0:01')
  expect(numeric(1000)).toEqual('0:01')
  expect(numeric(60000)).toEqual('1:00')
  expect(numeric(61000)).toEqual('1:01')
  expect(numeric(71000)).toEqual('1:11')
  expect(numeric(3600000)).toEqual('1:00:00')
  expect(numeric(3601000)).toEqual('1:00:01')
  expect(numeric(3661000)).toEqual('1:01:01')
  expect(numeric(86400000)).toEqual('24:00:00')
})

test('letters works', () => {
  expect(letters(-1000)).toEqual('-1s')
  expect(letters(1000)).toEqual('1s')
  expect(letters(60000)).toEqual('1m')
  expect(letters(61000)).toEqual('1m')
  expect(letters(71000)).toEqual('1m')
  expect(letters(120000)).toEqual('2m')
  expect(letters(110000)).toEqual('2m') // Rounding off
  expect(letters(3600000)).toEqual('1h')
  expect(letters(3601000)).toEqual('1h')
  expect(letters(3661000)).toEqual('1h 1m')
  expect(letters(86400000)).toEqual('24h')
})
