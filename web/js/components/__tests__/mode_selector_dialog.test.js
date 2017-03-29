/* eslint-env jest */

import ModeSelectorDialog from '../mode_selector_dialog'

import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

describe('ModeSelectorDialog', () => {
  it('exists', () => {
    expect(ModeSelectorDialog).toBeTruthy()
  })

  it('renders', () => {
    const comp = <ModeSelectorDialog />
    const wrapper = shallow(comp)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('renders with CONTINUOUS', () => {
    const comp = <ModeSelectorDialog selected='CONTINUOUS' />
    const wrapper = shallow(comp)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('is clickable', () => {
    return new Promise((resolve, reject) => {
      const comp = <ModeSelectorDialog selected='CONTINUOUS' onSelect={onSelect} />
      const wrapper = shallow(comp)
      wrapper.find('.option.-single').simulate('click')

      function onSelect () {
        expect(shallowToJson(wrapper)).toMatchSnapshot()
        resolve()
      }
    })
  })
})
