/* eslint-env jest */
import { byDate, recents } from '../log'

describe('byDate', () => {
  test('works on empty logs', () => {
    const result = byDate({
      log: {}
    })

    expect(result).toMatchSnapshot()
  })

  test('works on undefined logs', () => {
    const result = byDate({})
    expect(result).toMatchSnapshot()
  })

  test('groups by date', () => {
    const result = byDate({
      log: {
        a: {
          id: 'a',
          startedAt: new Date('2010-04-20T08:00:00Z')
        },
        b: {
          id: 'b',
          startedAt: new Date('2010-04-21T08:00:00Z')
        },
        c: {
          id: 'c',
          startedAt: new Date('2010-04-21T09:00:00Z')
        }
      }
    })

    expect(result).toMatchSnapshot()
  })
})

describe('recents', () => {
  test('works on empty logs', () => {
    const result = recents({
      log: {}
    })

    expect(result).toMatchSnapshot()
  })

  test('returns just todays items', () => {
    const result = recents({
      time: {
        now: new Date('2010-04-21T08:00:00Z')
      },
      log: {
        a: {
          id: 'a',
          timerType: 'work',
          startedAt: new Date('2010-04-20T08:00:00Z')
        },
        b: {
          id: 'b',
          timerType: 'work',
          startedAt: new Date('2010-04-21T08:00:00Z')
        },
        c: {
          id: 'c',
          timerType: 'work',
          startedAt: new Date('2010-04-21T09:00:00Z')
        }
      }
    })

    expect(result).toMatchSnapshot()
  })
})
