/* @flow */

/*::
  import type { DataStore } from '../selectors/data_store'
*/

/**
 * Migrations to perform.
 */

export const MIGRATIONS = {
  // '1': addDefaultsToLabels
}

/**
 * The version to be baked.
 */

export const LATEST_VERSION = 0

/**
 * Migrates data schemas. Used by persistence.
 */

export function migrate (data /*: DataStore */) /*: DataStore */ {
  data = Object.keys(MIGRATIONS).reduce((data, version) => {
    const fn = MIGRATIONS[version]

    if (data.version < +version) {
      data = fn(data)
      data.version = +version
    }

    return data
  }, data)

  return data
}
