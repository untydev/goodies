import makeOptions from '@untydev/options'

import { combineDuration } from './combine.js'
import { units } from './constants.js'

export const timePrecision = {
  SECOND: 0,
  SUB_SECOND: 1,
  MILLISECOND: 2,
  SUB_MILLISECOND: 3,
  MICROSECOND: 4,
  SUB_MICROSECOND: 5,
  NANOSECOND: 6,
  guess (duration) {
    if (duration.ns !== 0n) {
      return this.SUB_MICROSECOND
    }

    if (duration.us !== 0n) {
      return this.SUB_MILLISECOND
    }

    if (duration.ms !== 0n) {
      return this.SUB_SECOND
    }

    return this.SECOND
  }
}

Object.freeze(timePrecision)

export function formatDuration (duration, options) {
  options = makeOptions(options, {
    separator: ' ',
    precision: timePrecision.SUB_SECOND
  })

  const parts = []

  combineDuration(parts, duration.dd, units.DAY)
  combineDuration(parts, duration.hh, units.HOUR)
  combineDuration(parts, duration.mm, units.MINUTE)

  switch (options.precision) {
    case timePrecision.SECOND:
      combineDuration(parts, duration.ss, units.SECOND)
      break

    case timePrecision.SUB_SECOND:
      combineDuration(parts, duration.ss, units.SECOND, duration.ms, units.MILLISECOND)
      break

    case timePrecision.MILLISECOND:
      combineDuration(parts, duration.ss, units.SECOND)
      combineDuration(parts, duration.ms, units.MILLISECOND)
      break

    case timePrecision.SUB_MILLISECOND:
      combineDuration(parts, duration.ss, units.SECOND)
      combineDuration(parts, duration.ms, units.MILLISECOND, duration.us, units.MICROSECOND)
      break

    case timePrecision.MICROSECOND:
      combineDuration(parts, duration.ss, units.SECOND)
      combineDuration(parts, duration.ms, units.MILLISECOND)
      combineDuration(parts, duration.us, units.MICROSECOND)
      break

    case timePrecision.SUB_MICROSECOND:
      combineDuration(parts, duration.ss, units.SECOND)
      combineDuration(parts, duration.ms, units.MILLISECOND)
      combineDuration(parts, duration.us, units.MICROSECOND, duration.ns, units.NANOSECOND)
      break

    case timePrecision.NANOSECOND:
      combineDuration(parts, duration.ss, units.SECOND)
      combineDuration(parts, duration.ms, units.MILLISECOND)
      combineDuration(parts, duration.us, units.MICROSECOND)
      combineDuration(parts, duration.ns, units.NANOSECOND)
      break
  }

  return parts.join(options.separator)
}
