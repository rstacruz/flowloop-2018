/* eslint-env jest */

import TimerBlank from '../timer_blank'

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('TimerBlank', () => {
  it('exists', () => {
    expect(TimerBlank).toBeTruthy()
  })

  it('renders', () => {
    const comp = <TimerBlank />
    const wrapper = shallow(comp)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
