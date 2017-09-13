/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'

import { LabelSelector } from '../label_selector'

test('works', () => {
  const labels = {
    '_work': { id: 'work', name: 'Trabajo' }
  }

  const result = mount(
    <LabelSelector
      labels={labels}
      selectedId={'_work'}
      onSelect={() => {}}
      open={false}
      onToggleOpen={() => {}} />)

  expect(result.text()).toEqual('Trabajo')
})
