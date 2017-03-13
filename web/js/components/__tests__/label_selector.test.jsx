import React from 'react'
import LabelSelector from '../label_selector'
import {mount} from 'enzyme'

test('works', () => {
  const result = mount(
    <LabelSelector label="Work" />
  )

  expect(result.text()).toEqual('Work')
})
