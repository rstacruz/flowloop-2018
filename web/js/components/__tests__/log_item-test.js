/* eslint-env jest */

import LogItem from '../log_item'

import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
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

    const comp = <LogItem item={log} labels={labels} utc />
    const wrapper = mount(comp)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
