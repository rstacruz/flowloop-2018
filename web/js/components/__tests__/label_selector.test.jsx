/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'

import LabelSelector from '../label_selector'

test('works', () => {
  const result = mount(
    <LabelSelector label='Work' />
  )

  expect(result.text()).toEqual('Work')
})
