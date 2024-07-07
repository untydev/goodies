/**
 * @typedef {object} Result
 * @property {boolean} hasValue - Returns `true` if `this` contains a value, or `false` otherwise.
 * @property {boolean} hasError - Returns `true` if `this` contains an error, or `false` otherwise.
 * @property {*} value - Returns the contained value, or throws an error if `this` does not contain a value.
 * @property {function} valueOr - Returns the contained value, or a fallback value if `this` does not contain a value.
 * @property {*} error - Returns the contained error, or throws an error if `this` does not contain an error.
 * @property {*} either - Returns either the contained value or error.
 * @public
 */

import { ensureFunction } from '@untydev/types'

/**
 * Call the given function `fn` with `args`, and wrap the result.
 * @param {function} fn A function to call.
 * @param {...*} args Arguments to pass to `fn`.
 * @return {Result} Returns a `Result` instance that wraps the result of calling `fn`.
 * @constructor
 * @public
 */
export default function Result (fn, ...args) {
  if (!new.target) {
    return new Result(fn, ...args)
  }

  ensureFunction(fn)

  const [isError, either] = (() => {
    try {
      const value = fn(...args)
      return value instanceof Result ? [value.hasError, value.either] : [false, value]
    } catch (error) {
      return error instanceof Result ? [error.hasError, error.either] : [true, error]
    }
  })()

  Object.defineProperties(this, {
    hasValue: {
      value: !isError,
      enumerable: true
    },
    hasError: {
      value: isError,
      enumerable: true
    },
    value: {
      get: isError ? () => { throw either } : () => either
    },
    valueOr: {
      value: isError ? fallback => fallback : () => either
    },
    error: {
      get: isError ? () => either : () => { throw new Error('Bad result access') }
    },
    either: {
      value: either,
      enumerable: true
    }
  })

  Object.freeze(this)
}

Result.prototype = {
  * [Symbol.iterator] () {
    yield this.hasValue ? this.value : undefined
    yield this.hasError ? this.error : undefined
  }
}

/**
 * Creates a `Result` instance that contains the given value.
 * @param {*} value
 * @return {Result}
 * @public
 */
Result.ok = value => new Result(() => value)

/**
 * Creates a `Result` instance that contains the given error.
 * @param {*} error
 * @return {Result}
 * @public
 */
Result.fail = error => new Result(() => { throw error })

/**
 * Creates a `Result` instance that contains the result of the given promise.
 * @param {Promise} promise
 * @return {Promise}
 */
Result.promise = promise => promise.then(Result.ok, Result.fail)

/**
 * Creates a function that returns a `Result` instance that calls `fn`.
 * @param {function} fn A function to wrap.
 * @return {function(...*): Result}
 */
Result.wrap = fn => (...args) => new Result(fn, ...args)
