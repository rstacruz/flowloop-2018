/* eslint-env jest */
import Timer from '../timer'

test('work in progress', () => {
  const timer = Timer.full({
    time: { now: new Date('2010-04-23T08:00:00Z') },
    timer: {
      active: true,
      startedAt: new Date('2010-04-23T08:00:00Z'),
      endsAt: new Date('2010-04-23T08:30:00Z'),
      lastLap: new Date('2010-04-23T08:00:00Z'),
      duration: 30 * 60000,
      laps: 0,
      label: 'Work',
      type: 'work'
    }
  })

  expect(timer).toMatchSnapshot()
})

test('work in laps', () => {
  const timer = Timer.full({
    time: { now: new Date('2010-04-23T09:00:00Z') },
    timer: {
      active: true,
      startedAt: new Date('2010-04-23T08:00:00Z'),
      endsAt: new Date('2010-04-23T08:30:00Z'),
      lastLap: new Date('2010-04-23T08:30:00Z'),
      duration: 30 * 60000,
      laps: 2,
      label: 'Work',
      type: 'work'
    }
  })

  expect(timer).toMatchSnapshot()
})

test('inactive', () => {
  const timer = Timer.full({
    time: { now: new Date('2010-04-23T08:00:00Z') },
    timer: {
      active: false
    }
  })

  expect(timer).toMatchSnapshot()
})
