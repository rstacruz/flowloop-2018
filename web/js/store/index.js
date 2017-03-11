import { createStore } from 'redux'

export function buildStore () {
  return createStore(reducer, {})
}

function reducer (state, action) {
  console.log('=>', action)
  return state
}
