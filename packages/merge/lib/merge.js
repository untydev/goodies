import { isUndefined, ensureObject, ensurePlainObject } from '@untydev/types'

import mergeObject from './detail/mergeObject.js'

/**
 * Merge the properties of the source object into the destination object.
 *
 * @param {Object} destination - The object to merge the properties into. If undefined, an empty object will be used.
 * @param {Object} source - The object containing the properties to merge. If undefined, an empty object will be used.
 * @return {Object} - The merged object.
 * @throws {TypeError} `destination` must be an object or `undefined`.
 * @throws {TypeError} `source` must be a plain object or `undefined`.
 */
export default function merge (destination, source) {
  if (isUndefined(destination)) {
    destination = {}
  }

  if (isUndefined(source)) {
    source = {}
  }

  ensureObject(destination)
  ensurePlainObject(source)

  return mergeObject(destination, source)
}
