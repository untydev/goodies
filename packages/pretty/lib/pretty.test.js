import test from 'ava'

import * as pretty from './pretty.js'

const nsMacro = test.macro((t, input, expected) => {
  t.is(pretty.prettyNanoseconds(input), expected)
})

const usMacro = test.macro((t, input, expected) => {
  t.is(pretty.prettyMicroseconds(input), expected)
})

const msMacro = test.macro((t, input, expected) => {
  t.is(pretty.prettyMilliseconds(input), expected)
})

const ssMacro = test.macro((t, input, expected) => {
  t.is(pretty.prettySeconds(input), expected)
})

// prettyNanoseconds

test('prettyNanoseconds given 0ns returns "0ns"', nsMacro, pretty.parseNanoseconds('0ns'), '0ns')
test('prettyNanoseconds given 1ns returns "1ns"', nsMacro, pretty.parseNanoseconds('1ns'), '1ns')
test('prettyNanoseconds given 10ns returns "10ns"', nsMacro, pretty.parseNanoseconds('10ns'), '10ns')
test('prettyNanoseconds given 100ns returns "0.1μs"', nsMacro, pretty.parseNanoseconds('100ns'), '0.1μs')

test('prettyNanoseconds given 1μs returns "1μs"', nsMacro, pretty.parseNanoseconds('1μs'), '1μs')
test('prettyNanoseconds given 10μs returns "10μs"', nsMacro, pretty.parseNanoseconds('10μs'), '10μs')
test('prettyNanoseconds given 100μs returns "0.1ms"', nsMacro, pretty.parseNanoseconds('100μs'), '0.1ms')

test('prettyNanoseconds given 1ms returns "1ms"', nsMacro, pretty.parseNanoseconds('1ms'), '1ms')
test('prettyNanoseconds given 10ms returns "10ms"', nsMacro, pretty.parseNanoseconds('10ms'), '10ms')
test('prettyNanoseconds given 100ms returns "0.1s"', nsMacro, pretty.parseNanoseconds('100ms'), '0.1s')

test('prettyNanoseconds given 1s returns "1s"', nsMacro, pretty.parseNanoseconds('1s'), '1s')
test('prettyNanoseconds given 10s returns "10s"', nsMacro, pretty.parseNanoseconds('10s'), '10s')
test('prettyNanoseconds given 60s returns "1m"', nsMacro, pretty.parseNanoseconds('60s'), '1m')

test('prettyNanoseconds given 1m returns "1m"', nsMacro, pretty.parseNanoseconds('1m'), '1m')
test('prettyNanoseconds given 10m returns "10m"', nsMacro, pretty.parseNanoseconds('10m'), '10m')
test('prettyNanoseconds given 60m returns "60m"', nsMacro, pretty.parseNanoseconds('60m'), '1h')

test('prettyNanoseconds given 1h returns "1h"', nsMacro, pretty.parseNanoseconds('1h'), '1h')
test('prettyNanoseconds given 10h returns "10h"', nsMacro, pretty.parseNanoseconds('10h'), '10h')
test('prettyNanoseconds given 24h returns "1d"', nsMacro, pretty.parseNanoseconds('1d'), '1d')

test('prettyNanoseconds given 1d returns "1d"', nsMacro, pretty.parseNanoseconds('1d'), '1d')
test('prettyNanoseconds given 10d returns "10d"', nsMacro, pretty.parseNanoseconds('10d'), '10d')
test('prettyNanoseconds given 365d returns "365d"', nsMacro, pretty.parseNanoseconds('365d'), '365d')

test('prettyNanoseconds correctly rounds to microseconds', (t) => {
  t.is(pretty.prettyNanoseconds(pretty.parseNanoseconds('1μs 0ns')), '1μs')
  t.is(pretty.prettyNanoseconds(pretty.parseNanoseconds('1μs 49ns')), '1μs')
  t.is(pretty.prettyNanoseconds(pretty.parseNanoseconds('1μs 50ns')), '1.1μs')
  t.is(pretty.prettyNanoseconds(pretty.parseNanoseconds('1μs 999ns')), '2μs')
})

// prettyMicroseconds

test('prettyMicroseconds given 0μs returns "0μs"', usMacro, pretty.parseMicroseconds('0μs'), '0μs')
test('prettyMicroseconds given 1μs returns "1μs"', usMacro, pretty.parseMicroseconds('1μs'), '1μs')
test('prettyMicroseconds given 10μs returns "10μs"', usMacro, pretty.parseMicroseconds('10μs'), '10μs')
test('prettyMicroseconds given 100μs returns "0.1ms"', usMacro, pretty.parseMicroseconds('100μs'), '0.1ms')

test('prettyMicroseconds given 1ms returns "1ms"', usMacro, pretty.parseMicroseconds('1ms'), '1ms')
test('prettyMicroseconds given 10ms returns "10ms"', usMacro, pretty.parseMicroseconds('10ms'), '10ms')
test('prettyMicroseconds given 100ms returns "0.1s"', usMacro, pretty.parseMicroseconds('100ms'), '0.1s')

test('prettyMicroseconds given 1s returns "1s"', usMacro, pretty.parseMicroseconds('1s'), '1s')
test('prettyMicroseconds given 10s returns "10s"', usMacro, pretty.parseMicroseconds('10s'), '10s')
test('prettyMicroseconds given 60s returns "1m"', usMacro, pretty.parseMicroseconds('60s'), '1m')

test('prettyMicroseconds given 1m returns "1m"', usMacro, pretty.parseMicroseconds('1m'), '1m')
test('prettyMicroseconds given 10m returns "10m"', usMacro, pretty.parseMicroseconds('10m'), '10m')
test('prettyMicroseconds given 60m returns "1h"', usMacro, pretty.parseMicroseconds('60m'), '1h')

test('prettyMicroseconds given 1h returns "1h"', usMacro, pretty.parseMicroseconds('1h'), '1h')
test('prettyMicroseconds given 10h returns "10h"', usMacro, pretty.parseMicroseconds('10h'), '10h')
test('prettyMicroseconds given 24h returns "1d"', usMacro, pretty.parseMicroseconds('24h'), '1d')

test('prettyMicroseconds given 1d returns "1d"', usMacro, pretty.parseMicroseconds('1d'), '1d')
test('prettyMicroseconds given 10d returns "10d"', usMacro, pretty.parseMicroseconds('10d'), '10d')
test('prettyMicroseconds given 365d returns "365d"', usMacro, pretty.parseMicroseconds('365d'), '365d')

test('prettyMicroseconds correctly rounds to milliseconds', (t) => {
  t.is(pretty.prettyMicroseconds(pretty.parseMicroseconds('1ms 0μs')), '1ms')
  t.is(pretty.prettyMicroseconds(pretty.parseMicroseconds('1ms 49μs')), '1ms')
  t.is(pretty.prettyMicroseconds(pretty.parseMicroseconds('1ms 50μs')), '1.1ms')
  t.is(pretty.prettyMicroseconds(pretty.parseMicroseconds('1ms 999μs')), '2ms')
})

// prettyMilliseconds

test('prettyMilliseconds given 0ms returns "0ms"', msMacro, pretty.parseMilliseconds('0ms'), '0ms')

test('prettyMilliseconds given 1ms returns "1ms"', msMacro, pretty.parseMilliseconds('1ms'), '1ms')
test('prettyMilliseconds given 10ms returns "10ms"', msMacro, pretty.parseMilliseconds('10ms'), '10ms')
test('prettyMilliseconds given 100ms returns "0.1s"', msMacro, pretty.parseMilliseconds('100ms'), '0.1s')

test('prettyMilliseconds given 1s returns "1s"', msMacro, pretty.parseMilliseconds('1s'), '1s')
test('prettyMilliseconds given 10s returns "10s"', msMacro, pretty.parseMilliseconds('10s'), '10s')
test('prettyMilliseconds given 60s returns "1m"', msMacro, pretty.parseMilliseconds('60s'), '1m')

test('prettyMilliseconds given 1m returns "1m"', msMacro, pretty.parseMilliseconds('1m'), '1m')
test('prettyMilliseconds given 10m returns "10m"', msMacro, pretty.parseMilliseconds('10m'), '10m')
test('prettyMilliseconds given 60m returns "1h"', msMacro, pretty.parseMilliseconds('60m'), '1h')

test('prettyMilliseconds given 1h returns "1h"', msMacro, pretty.parseMilliseconds('1h'), '1h')
test('prettyMilliseconds given 10h returns "10h"', msMacro, pretty.parseMilliseconds('10h'), '10h')
test('prettyMilliseconds given 24h returns "1d"', msMacro, pretty.parseMilliseconds('24h'), '1d')

test('prettyMilliseconds given 1d returns "1d"', msMacro, pretty.parseMilliseconds('1d'), '1d')
test('prettyMilliseconds given 10d returns "10d"', msMacro, pretty.parseMilliseconds('10d'), '10d')
test('prettyMilliseconds given 365d returns "365"', msMacro, pretty.parseMilliseconds('365d'), '365d')

test('prettyMilliseconds correctly rounds to seconds', (t) => {
  t.is(pretty.prettyMilliseconds(pretty.parseMilliseconds('1s 0ms')), '1s')
  t.is(pretty.prettyMilliseconds(pretty.parseMilliseconds('1s 49ms')), '1s')
  t.is(pretty.prettyMilliseconds(pretty.parseMilliseconds('1s 50ms')), '1.1s')
  t.is(pretty.prettyMilliseconds(pretty.parseMilliseconds('1s 999ms')), '2s')
})

// prettySeconds

test('prettySeconds given 0s returns "0s"', ssMacro, pretty.parseSeconds('0s'), '0s')

test('prettySeconds given 1s returns "1s"', ssMacro, pretty.parseSeconds('1s'), '1s')
test('prettySeconds given 10s returns "10s"', ssMacro, pretty.parseSeconds('10s'), '10s')
test('prettySeconds given 60s returns "1m"', ssMacro, pretty.parseSeconds('60s'), '1m')

test('prettySeconds given 1m returns "1m"', ssMacro, pretty.parseSeconds('1m'), '1m')
test('prettySeconds given 10m returns "10m"', ssMacro, pretty.parseSeconds('10m'), '10m')
test('prettySeconds given 60m returns "1h"', ssMacro, pretty.parseSeconds('60m'), '1h')

test('prettySeconds given 1h returns "1h"', ssMacro, pretty.parseSeconds('1h'), '1h')
test('prettySeconds given 10h returns "10h"', ssMacro, pretty.parseSeconds('10h'), '10h')
test('prettySeconds given 24h returns "1d"', ssMacro, pretty.parseSeconds('24h'), '1d')

test('prettySeconds given 1d returns "1d"', ssMacro, pretty.parseSeconds('1d'), '1d')
test('prettySeconds given 10d returns "10d"', ssMacro, pretty.parseSeconds('10d'), '10d')
test('prettySeconds given 365d returns "365d"', ssMacro, pretty.parseSeconds('365d'), '365d')

// prettyHrtime

test('prettyHrtime throws if input is not a bigint or an array', (t) => {
  t.throws(() => pretty.prettyHrtime('1'), { instanceOf: TypeError })
})

test('prettyHrtime throws if the input is not a 2-elements array', (t) => {
  t.throws(() => pretty.prettyHrtime([]), { instanceOf: Error })
  t.throws(() => pretty.prettyHrtime([1]), { instanceOf: Error })
  t.throws(() => pretty.prettyHrtime([1, 2, 3]), { instanceOf: Error })
})

test('prettyHrtime throws if any of the array elements is not an integer', (t) => {
  t.throws(() => pretty.prettyHrtime([0.1, 2]), { instanceOf: TypeError })
  t.throws(() => pretty.prettyHrtime([1, 0.2]), { instanceOf: TypeError })
})

test('prettyHrtime given a bigint returns a formatted string', (t) => {
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('0ns')), '0ns')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1ns')), '1ns')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10ns')), '10ns')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('100ns')), '0.1μs')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1μs')), '1μs')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10μs')), '10μs')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('100μs')), '0.1ms')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1ms')), '1ms')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10ms')), '10ms')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('100ms')), '0.1s')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1s')), '1s')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10s')), '10s')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('60s')), '1m')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1m')), '1m')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10m')), '10m')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('60m')), '1h')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1h')), '1h')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10h')), '10h')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('24h')), '1d')

  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1d')), '1d')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('10d')), '10d')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('365d')), '365d')
})

test('prettyHrtime given an array returns a formatted string', (t) => {
  t.is(pretty.prettyHrtime([0, 0]), '0ns')

  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('1ns'))]), '1ns')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('10ns'))]), '10ns')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('100ns'))]), '0.1μs')

  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('1μs'))]), '1μs')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('10μs'))]), '10μs')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('100μs'))]), '0.1ms')

  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('1ms'))]), '1ms')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('10ms'))]), '10ms')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('100ms'))]), '0.1s')

  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('1s')), 0]), '1s')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('10s')), 0]), '10s')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('60s')), 0]), '1m')

  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('1m')), 0]), '1m')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('10m')), 0]), '10m')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('60m')), 0]), '1h')

  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('1h')), 0]), '1h')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('10h')), 0]), '10h')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('24h')), 0]), '1d')

  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('1d')), 0]), '1d')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('10d')), 0]), '10d')
  t.is(pretty.prettyHrtime([Number(pretty.parseSeconds('365d')), 0]), '365d')
})
