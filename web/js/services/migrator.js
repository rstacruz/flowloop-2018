/* @flow */

/*::
  import type { DataStore } from '../selectors/data_store'
*/

/**
 * The version to be baked.
 */

export const LATEST_VERSION = 0

/**
 * Migrates data schemas. Used by persistence.
 */

export function migrate (data /*: DataStore */) /*: DataStore */ {
  if (data.version < 1) data = addDefaultsToLabels(data)
  data.version = LATEST_VERSION
  return data
}

/*
 * Add isDefault and isDeletable flag to labels.
 */

export function addDefaultsToLabels (data /*: DataStore */) {
  return data
}
