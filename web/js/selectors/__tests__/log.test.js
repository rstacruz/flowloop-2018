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
    const src = {
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
    }

    const result = byDate(src)
    const keys = Object.keys(result)
    expect(keys.length).toEqual(2)
    expect(result[keys[0]].length).toEqual(1)
    expect(result[keys[1]].length).toEqual(2)
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
