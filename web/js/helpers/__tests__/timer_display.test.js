/* eslint-env jest */
import timerDisplay from '../timer_display'

describe('timerDisplay', () => {
  test('works', () => {
    expect(timerDisplay(1000)).toEqual('0:01')
    expect(timerDisplay(60000)).toEqual('1:00')
    expect(timerDisplay(61000)).toEqual('1:01')
    expect(timerDisplay(71000)).toEqual('1:11')
    expect(timerDisplay(3600000)).toEqual('1:00:00')
    expect(timerDisplay(3601000)).toEqual('1:00:01')
    expect(timerDisplay(3661000)).toEqual('1:01:01')
    expect(timerDisplay(86400000)).toEqual('24:00:00')
  })
})
