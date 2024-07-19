import constants from './constants.js'

export default function decompose (value) {
  return {
    dd: value / constants.NANOSECONDS_IN_ONE_DAY,
    hh: value / constants.NANOSECONDS_IN_ONE_HOUR % 24n,
    mm: value / constants.NANOSECONDS_IN_ONE_MINUTE % 60n,
    ss: value / constants.NANOSECONDS_IN_ONE_SECOND % 60n,
    ms: value / constants.NANOSECONDS_IN_ONE_MILLISECOND % 1000n,
    us: value / constants.NANOSECONDS_IN_ONE_MICROSECOND % 1000n,
    ns: value % 1000n
  }
}
