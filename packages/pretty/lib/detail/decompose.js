import { vals } from './constants.js'

export function decomposeDuration (value) {
  return {
    dd: value / vals.NANOSECONDS_IN_ONE_DAY,
    hh: value / vals.NANOSECONDS_IN_ONE_HOUR % 24n,
    mm: value / vals.NANOSECONDS_IN_ONE_MINUTE % 60n,
    ss: value / vals.NANOSECONDS_IN_ONE_SECOND % 60n,
    ms: value / vals.NANOSECONDS_IN_ONE_MILLISECOND % 1000n,
    us: value / vals.NANOSECONDS_IN_ONE_MICROSECOND % 1000n,
    ns: value % 1000n
  }
}
