/* eslint-env jest */

import PieGraph from '../pie_graph'

import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

describe('PieGraph', () => {
  it('exists', () => {
    expect(PieGraph).toBeTruthy()
  })

  it('renders', () => {
    const comp = <PieGraph steps={12} progress={0.6} color='red' />
    const wrapper = shallow(comp)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
