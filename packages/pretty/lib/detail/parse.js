import iterate from '@untydev/iterate'

import { units } from './constants.js'

export function parseDuration (value) {
  const parts = value.split(/\s/)
  const duration = {}

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

  return {
    dd: duration.dd ?? 0n,
    hh: duration.hh ?? 0n,
    mm: duration.mm ?? 0n,
    ss: duration.ss ?? 0n,
    ms: duration.ms ?? 0n,
    us: duration.us ?? 0n,
    ns: duration.ns ?? 0n
  }
}
