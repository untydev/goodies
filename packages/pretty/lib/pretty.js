import makeOptions from '@untydev/options'
import { isBigInt, ensureInteger, ensureString, ensureArray, ensureFunction } from '@untydev/types'

import combine from './detail/combine.js'
import constants from './detail/constants.js'
import decompose from './detail/decompose.js'

const PRECISION_SECOND = 0
const PRECISION_SUB_SECOND = 1
const PRECISION_MILLISECOND = 2
const PRECISION_SUB_MILLISECOND = 3
const PRECISION_MICROSECOND = 4
const PRECISION_SUB_MICROSECOND = 5
const PRECISION_NANOSECOND = 6

function format (time, options) {
  options = makeOptions(options, {
    separator: ' ',
    precision: PRECISION_SUB_SECOND
  })

  const result = []

  combine(result, time.dd, constants.UNIT_DAY)
  combine(result, time.hh, constants.UNIT_HOUR)
  combine(result, time.mm, constants.UNIT_MINUTE)

  switch (options.precision) {
    case PRECISION_SECOND:
      combine(result, time.ss, constants.UNIT_SECOND)
      break

    case PRECISION_SUB_SECOND:
      combine(result, time.ss, constants.UNIT_SECOND, time.ms, constants.UNIT_MILLISECOND)
      break

    case PRECISION_MILLISECOND:
      combine(result, time.ss, constants.UNIT_SECOND)
      combine(result, time.ms, constants.UNIT_MILLISECOND)
      break

    case PRECISION_SUB_MILLISECOND:
      combine(result, time.ss, constants.UNIT_SECOND)
      combine(result, time.ms, constants.UNIT_MILLISECOND, time.us, constants.UNIT_MICROSECOND)
      break

    case PRECISION_MICROSECOND:
      combine(result, time.ss, constants.UNIT_SECOND)
      combine(result, time.ms, constants.UNIT_MILLISECOND)
      combine(result, time.us, constants.UNIT_MICROSECOND)
      break

    case PRECISION_SUB_MICROSECOND:
      combine(result, time.ss, constants.UNIT_SECOND)
      combine(result, time.ms, constants.UNIT_MILLISECOND)
      combine(result, time.us, constants.UNIT_MICROSECOND, time.ns, constants.UNIT_NANOSECOND)
      break

    case PRECISION_NANOSECOND:
      combine(result, time.ss, constants.UNIT_SECOND)
      combine(result, time.ms, constants.UNIT_MILLISECOND)
      combine(result, time.us, constants.UNIT_MICROSECOND)
      combine(result, time.ns, constants.UNIT_NANOSECOND)
      break
  }

  return result.join(options.separator)
}

export function prettyNanoseconds (value, options) {
  return format(decompose(BigInt(value)), { ...options, precision: PRECISION_SUB_MICROSECOND })
}

export function prettyMicroseconds (value, options) {
  return format(decompose(BigInt(value) * constants.NANOSECONDS_IN_ONE_MICROSECOND), { ...options, precision: PRECISION_SUB_MILLISECOND })
}

export function prettyMilliseconds (value, options) {
  return format(decompose(BigInt(value) * constants.NANOSECONDS_IN_ONE_MILLISECOND), { ...options, precision: PRECISION_SUB_SECOND })
}

/**
 * @param {number|bigint} value
 * @param {object} options
 * @returns {string}
 */
export function prettySeconds (value, options) {
  return format(decompose(BigInt(value) * constants.NANOSECONDS_IN_ONE_SECOND), { ...options, precision: PRECISION_SECOND })
}

export function prettyHrtime (value, options) {
  if (isBigInt(value)) {
    // Assume that the `value` was obtained from a call to process.hrtime.bigint().
    return prettyNanoseconds(value)
  }

  // Otherwise, the legacy process.hrtime() was used which returns a 2-element array of numbers.
  ensureArray(value)
  ensureInteger(value[0])
  ensureInteger(value[1])

  const seconds = BigInt(value[0])
  const nanoseconds = BigInt(value[1])

  return prettyNanoseconds(seconds * constants.NANOSECONDS_IN_ONE_SECOND + nanoseconds, options)
}

/**
 * Formats the given value into a human-readable string.
 *
 * @param {number|bigint} value
 * @param {string} unit
 * @param {object} options
 * @returns {*}
 */
export default function pretty (value, unit, options) {
  ensureString(unit)
  const pretty = this[unit]
  ensureFunction(pretty)
  return pretty(value, options)
}

pretty.ns = prettyNanoseconds
pretty.us = prettyMicroseconds
pretty.ms = prettyMilliseconds
pretty.ss = prettySeconds
