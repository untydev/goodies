import merge from '@untydev/merge'
import { ensurePlainObject } from '@untydev/types'

/**
 * Returns options object by merging the input options with default options.
 *
 * @param {Object} inputOptions - The input options object.
 * @param {Object} defaultOptions - The default options object.
 * @return {Object} options - The merged options object.
 * @throws {TypeError} `inputOptions` must be a plain object.
 * @throws {TypeError} `defaultOptions` must be a plain object.
 */
export default function makeOptions (inputOptions, defaultOptions) {
  ensurePlainObject(inputOptions)
  ensurePlainObject(defaultOptions)
  return merge(structuredClone(defaultOptions), inputOptions)
}
