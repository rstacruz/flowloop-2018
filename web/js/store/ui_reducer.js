import buildReducer from 'build-reducer'

/**
 * Settings reducer
 */

export default buildReducer({
  'init': init,
  'ui:update': update
})

/*
 * Initializes the default state
 */

function init (state) {
  return { ...state, 'ui': {} }
}

/*
 * Updates the UI state
 */

function update (state, { payload }) {
  const ui = { ...(state.ui || {}), ...(payload || {}) }
  return { ...state, ui }
}
