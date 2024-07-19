export const units = {
  NANOSECOND: 'ns',
  MICROSECOND: 'μs',
  MILLISECOND: 'ms',
  SECOND: 's',
  MINUTE: 'm',
  HOUR: 'h',
  DAY: 'd'
}

Object.freeze(units)

export const vals = {
  NANOSECONDS_IN_ONE_MICROSECOND: 1000n,
  NANOSECONDS_IN_ONE_MILLISECOND: 1000n * 1000n,
  NANOSECONDS_IN_ONE_SECOND: 1000n * 1000n * 1000n,
  NANOSECONDS_IN_ONE_MINUTE: 1000n * 1000n * 1000n * 60n,
  NANOSECONDS_IN_ONE_HOUR: 1000n * 1000n * 1000n * 60n * 60n,
  NANOSECONDS_IN_ONE_DAY: 1000n * 1000n * 1000n * 60n * 60n * 24n
}

Object.freeze(vals)
