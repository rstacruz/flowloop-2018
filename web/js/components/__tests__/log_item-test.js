/* eslint-env jest */

import LogItem from '../log_item'

import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import MockDate from 'mockdate'

import { labels, logs } from '../../../../test/support/fixtures'

beforeEach(() => {
  MockDate.set('2010-04-20', 120)
})

afterEach(() => {
  MockDate.reset()
})

describe('LogItem', () => {
  it('exists', () => {
    expect(LogItem).toBeTruthy()
  })

  it('renders', () => {
    const log = logs['_log0']

    const comp = <LogItem item={log} labels={labels} />
    const wrapper = shallow(comp)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
