export const labels = {
  '_work': {
    id: '_work',
    name: 'Work',
    color: 'blue'
  },

  '_chore': {
    id: '_chore',
    name: 'Chore',
    color: 'red'
  }
}

export const logs = {
  '_log0': {
    id: '_log0',
    timerType: 'work',
    startedAt: new Date('2010-04-20T10:00:00Z'),
    endedAt: new Date('2010-04-20T10:30:00Z'),
    duration: 30 * 60 * 1000,
    labelId: '_work',
    isComplete: true
  },
  '_log1': {
    id: '_log1',
    timerType: 'work',
    startedAt: new Date('2010-04-20T11:00:00Z'),
    endedAt: new Date('2010-04-20T11:30:00Z'),
    duration: 30 * 60 * 1000,
    labelId: '_chore',
    isComplete: true
  }
}
