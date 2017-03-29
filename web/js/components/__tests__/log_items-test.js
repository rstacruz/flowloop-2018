/* eslint-env jest */

import LogItems from '../log_items'

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { labels, logs } from '../../../../test/support/fixtures'

describe('LogItems', () => {
  it('exists', () => {
    expect(LogItems).toBeTruthy()
  })

  it('renders', () => {
    const comp = <LogItems items={logs} labels={labels} />
    const wrapper = shallow(comp)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
