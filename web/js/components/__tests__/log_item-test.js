/* eslint-env jest */

import LogItem from '../log_item'

import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

describe('LogItem', () => {
  it('exists', () => {
    expect(LogItem).toBeTruthy()
  })

  it('renders', () => {
    const log = {
      id: '_log',
      timerType: 'work',
      startedAt: new Date('04/20/2010'),
      endedAt: new Date('04/20/2010'),
      duration: 60000,
      labelId: '_work',
      isComplete: true
    }

    const labels = {
      '_work': {
        id: '_work',
        name: 'Work',
        color: 'blue'
      }
    }

    const comp = <LogItem item={log} labels={labels} />
    const wrapper = shallow(comp)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
