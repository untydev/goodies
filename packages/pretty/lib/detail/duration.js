import makeOptions from '@untydev/options'
import { isBigInt, ensurePlainObject, isUndefined } from '@untydev/types'
import iterate from '@untydev/iterate'

const units = {
  NANOSECOND: 'ns',
  MICROSECOND: 'μs',
  MILLISECOND: 'ms',
  SECOND: 's',
  MINUTE: 'm',
  HOUR: 'h',
  DAY: 'd'
}

Object.freeze(units)

export { units as durationUnits }

export const vals = {
  NANOSECONDS_IN_ONE_MICROSECOND: 1000n,
  NANOSECONDS_IN_ONE_MILLISECOND: 1000n * 1000n,
  NANOSECONDS_IN_ONE_SECOND: 1000n * 1000n * 1000n,
  NANOSECONDS_IN_ONE_MINUTE: 1000n * 1000n * 1000n * 60n,
  NANOSECONDS_IN_ONE_HOUR: 1000n * 1000n * 1000n * 60n * 60n,
  NANOSECONDS_IN_ONE_DAY: 1000n * 1000n * 1000n * 60n * 60n * 24n
}

Object.freeze(vals)

export { vals as durationVals }

const timePrecision = {
  SECOND: 0, // 1s 100ms
  SUB_SECOND: 1, // 1.1s
  MILLISECOND: 2, // 1ms 100μs
  SUB_MILLISECOND: 3, // 1.1ms
  MICROSECOND: 4, // 1μs 100ns
  SUB_MICROSECOND: 5, // 1.1μs
  NANOSECOND: 6 // 1ns
}

Object.freeze(timePrecision)

function inferTimePrecision (value) {
  if (value < vals.NANOSECONDS_IN_ONE_MICROSECOND / 10n) {
    return timePrecision.NANOSECOND
  }

  if (value < vals.NANOSECONDS_IN_ONE_MILLISECOND / 10n) {
    return timePrecision.SUB_MICROSECOND
  }

  if (value < vals.NANOSECONDS_IN_ONE_SECOND / 10n) {
    return timePrecision.SUB_MILLISECOND
  }

  if (value < vals.NANOSECONDS_IN_ONE_MINUTE) {
    return timePrecision.SUB_SECOND
  }

  return timePrecision.SECOND
}

function combineDuration (resultArray, higherValue, higherUnit, lowerValue, lowerUnit) {
  if (isUndefined(lowerValue)) {
    if (higherValue > 0n) {
      resultArray.push(`${higherValue}${higherUnit}`)
    }
    return
  }

  if (lowerValue < 1e2 && higherValue === 0n) {
    if (lowerValue > 0n || resultArray.length === 0) {
      resultArray.push(`${lowerValue}${lowerUnit}`)
    }
  } else {
    const rounded = Math.round(Number(lowerValue) / 100)
    if (rounded > 9) {
      resultArray.push(`${higherValue + 1n}${higherUnit}`)
    } else if (rounded > 0) {
      resultArray.push(`${higherValue}.${Math.round(Number(lowerValue) / 100)}${higherUnit}`)
    } else {
      resultArray.push(`${higherValue}${higherUnit}`)
    }
  }
}

function decomposeDuration (value) {
  return {
    dd: value / vals.NANOSECONDS_IN_ONE_DAY,
    hh: value / vals.NANOSECONDS_IN_ONE_HOUR % 24n,
    mm: value / vals.NANOSECONDS_IN_ONE_MINUTE % 60n,
    ss: value / vals.NANOSECONDS_IN_ONE_SECOND % 60n,
    ms: value / vals.NANOSECONDS_IN_ONE_MILLISECOND % 1000n,
    us: value / vals.NANOSECONDS_IN_ONE_MICROSECOND % 1000n,
    ns: value % 1000n,
    _ns: value
  }
}

export function formatDuration (duration, options) {
  if (isBigInt(duration)) {
    duration = decomposeDuration(duration)
  }

  ensurePlainObject(duration)

  options = makeOptions(options, {
    separator: ' ',
    precision: inferTimePrecision(duration._ns),
    inputUnit: units.NANOSECOND
  })

  if (duration._ns === 0n) {
    return `0${options.inputUnit}`
  }

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

export function parseDuration (value) {
  const parts = value.split(/\s/)
  const duration = {
    dd: 0n, hh: 0n, mm: 0n, ss: 0n, ms: 0n, us: 0n, ns: 0n
  }

  iterate(parts, (value) => {
    if (value.endsWith(units.NANOSECOND)) {
      duration.ns = BigInt(value.slice(0, -2))
      return
    }

    if (value.endsWith(units.MICROSECOND)) {
      duration.us = BigInt(value.slice(0, -2))
      return
    }

    if (value.endsWith(units.MILLISECOND)) {
      duration.ms = BigInt(value.slice(0, -2))
      return
    }

    if (value.endsWith(units.SECOND)) {
      duration.ss = BigInt(value.slice(0, -1))
      return
    }

    if (value.endsWith(units.MINUTE)) {
      duration.mm = BigInt(value.slice(0, -1))
      return
    }

    if (value.endsWith(units.HOUR)) {
      duration.hh = BigInt(value.slice(0, -1))
      return
    }

    if (value.endsWith(units.DAY)) {
      duration.dd = BigInt(value.slice(0, -1))
    }
  })

  return duration
}
