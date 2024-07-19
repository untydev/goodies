import merge from '@untydev/merge'
import { isUndefined, ensurePlainObject } from '@untydev/types'

/**
 * Returns options object by merging the input options with default options.
 *
 * @param {Object|undefined} inputOptions - The input options object.
 * @param {Object|undefined} defaultOptions - The default options object.
 * @return {Object} options - The merged options object.
 * @throws {TypeError} `inputOptions` must be a plain object.
 * @throws {TypeError} `defaultOptions` must be a plain object.
 */
export default function makeOptions (inputOptions, defaultOptions) {
  if (isUndefined(inputOptions)) {
    inputOptions = {}
  }

  if (isUndefined(defaultOptions)) {
    defaultOptions = {}
  }

  ensurePlainObject(inputOptions)
  ensurePlainObject(defaultOptions)
  return merge(structuredClone(defaultOptions), inputOptions)
}
