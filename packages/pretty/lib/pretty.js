import { isBigInt, ensureInteger, ensureArray } from '@untydev/types'

import { vals } from './detail/constants.js'
import { decomposeDuration } from './detail/decompose.js'
import { parseDuration } from './detail/parse.js'
import { formatDuration, timePrecision } from './detail/format.js'

/**
 * Generates a human-readable string representation of nanoseconds.
 *
 * @param {number|bigint} value - The value in nanoseconds to be formatted.
 * @returns {string} - The formatted string representation of the value.
 */
export function prettyNanoseconds (value) {
  return formatDuration(decomposeDuration(BigInt(value)), { precision: timePrecision.SUB_MICROSECOND })
}

/**
 * Returns a human-readable string representation of microseconds.
 *
 * @param {number|bigint} value - The value in microseconds to be formatted.
 * @returns {string} - The formatted string representation of the value.
 */
export function prettyMicroseconds (value) {
  return formatDuration(decomposeDuration(BigInt(value) * vals.NANOSECONDS_IN_ONE_MICROSECOND), { precision: timePrecision.SUB_MILLISECOND })
}

/**
 * Returns a human-readable string representation of milliseconds.
 *
 * @param {number|bigint} value - The value in milliseconds to be formatted.
 * @returns {string} - The formatted string representation of the value.
 */
export function prettyMilliseconds (value) {
  return formatDuration(decomposeDuration(BigInt(value) * vals.NANOSECONDS_IN_ONE_MILLISECOND), { precision: timePrecision.SUB_SECOND })
}

/**
 * Returns a human-readable string representation of seconds.
 *
 * @param {number|bigint} value - The value in seconds to be formatted.
 * @returns {string} - The formatted string representation of the value.
 */
export function prettySeconds (value) {
  return formatDuration(decomposeDuration(BigInt(value) * vals.NANOSECONDS_IN_ONE_SECOND), { precision: timePrecision.SECOND })
}

/**
 * Returns a human-readable string representation of `process.hrtime` or `process.hrtime.bigint`.
 *
 * @param {number|bigint|array} value - The value obtained from a call to `process.hrtime` or `process.hrtime.bigint` to be formatted.
 * @returns {string} - The formatted string representation of the value.
 */
export function prettyHrtime (value) {
  const prettyNanoseconds = (value) => {
    const duration = decomposeDuration(BigInt(value))
    return formatDuration(duration, { precision: timePrecision.guess(duration) })
  }

  if (isBigInt(value)) {
    // Assume that the `value` was obtained from a call to process.hrtime.bigint().
    return prettyNanoseconds(value)
  }

  // Otherwise, the legacy process.hrtime() was used which returns a 2-element array of numbers.
  ensureArray(value)

  if (value.length !== 2) {
    throw new Error('Expected a 2-element array')
  }

  ensureInteger(value[0])
  ensureInteger(value[1])

  const seconds = BigInt(value[0])
  const nanoseconds = BigInt(value[1])

  return prettyNanoseconds(seconds * vals.NANOSECONDS_IN_ONE_SECOND + nanoseconds)
}

/**
 * @private
 */
export function parseNanoseconds (value) {
  const duration = parseDuration(value)
  return duration.ns +
    duration.us * vals.NANOSECONDS_IN_ONE_MICROSECOND +
    duration.ms * vals.NANOSECONDS_IN_ONE_MILLISECOND +
    duration.ss * vals.NANOSECONDS_IN_ONE_SECOND +
    duration.mm * vals.NANOSECONDS_IN_ONE_MINUTE +
    duration.hh * vals.NANOSECONDS_IN_ONE_HOUR +
    duration.dd * vals.NANOSECONDS_IN_ONE_DAY
}

/**
 * @private
 */
export function parseMicroseconds (value) {
  const duration = parseDuration(value)
  return (duration.ns +
    duration.us * vals.NANOSECONDS_IN_ONE_MICROSECOND +
    duration.ms * vals.NANOSECONDS_IN_ONE_MILLISECOND +
    duration.ss * vals.NANOSECONDS_IN_ONE_SECOND +
    duration.mm * vals.NANOSECONDS_IN_ONE_MINUTE +
    duration.hh * vals.NANOSECONDS_IN_ONE_HOUR +
    duration.dd * vals.NANOSECONDS_IN_ONE_DAY) /
    1000n
}

/**
 * @private
 */
export function parseMilliseconds (value) {
  const duration = parseDuration(value)
  return (duration.ns +
    duration.us * vals.NANOSECONDS_IN_ONE_MICROSECOND +
    duration.ms * vals.NANOSECONDS_IN_ONE_MILLISECOND +
    duration.ss * vals.NANOSECONDS_IN_ONE_SECOND +
    duration.mm * vals.NANOSECONDS_IN_ONE_MINUTE +
    duration.hh * vals.NANOSECONDS_IN_ONE_HOUR +
    duration.dd * vals.NANOSECONDS_IN_ONE_DAY) /
    1000_000n
}

/**
 * @private
 */
export function parseSeconds (value) {
  const duration = parseDuration(value)
  return (duration.ns +
    duration.us * vals.NANOSECONDS_IN_ONE_MICROSECOND +
    duration.ms * vals.NANOSECONDS_IN_ONE_MILLISECOND +
    duration.ss * vals.NANOSECONDS_IN_ONE_SECOND +
    duration.mm * vals.NANOSECONDS_IN_ONE_MINUTE +
    duration.hh * vals.NANOSECONDS_IN_ONE_HOUR +
    duration.dd * vals.NANOSECONDS_IN_ONE_DAY) /
    1000_000_000n
}
