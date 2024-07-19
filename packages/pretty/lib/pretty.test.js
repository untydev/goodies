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

test('prettyNanoseconds given 1ns returns "1ns"', nsMacro, pretty.parseNanoseconds('1ns'), '1ns')
test('prettyNanoseconds given 10ns returns "10ns"', nsMacro, pretty.parseNanoseconds('10ns'), '10ns')
test('prettyNanoseconds given 100ns returns "0.1μs"', nsMacro, pretty.parseNanoseconds('100ns'), '0.1μs')

test('prettyNanoseconds given 1μs returns "1μs"', nsMacro, pretty.parseNanoseconds('1μs'), '1μs')
test('prettyNanoseconds given 1μs 49ns returns "1μs"', nsMacro, pretty.parseNanoseconds('1μs 49ns'), '1μs')
test('prettyNanoseconds given 1μs 50ns returns "1.1μs"', nsMacro, pretty.parseNanoseconds('1μs 50ns'), '1.1μs')

test('prettyNanoseconds given 1ms returns "1ms"', nsMacro, pretty.parseNanoseconds('1ms'), '1ms')
test('prettyNanoseconds given 1ms 1ns returns "1ms 1ns"', nsMacro, pretty.parseNanoseconds('1ms 1ns'), '1ms 1ns')
test('prettyNanoseconds given 1ms 10ns returns "1ms 10ns"', nsMacro, pretty.parseNanoseconds('1ms 10ns'), '1ms 10ns')
test('prettyNanoseconds given 1ms 100ns returns "1ms 100ns"', nsMacro, pretty.parseNanoseconds('1ms 100ns'), '1ms 0.1μs')
test('prettyNanoseconds given 1ms 1μs returns "1ms 1μs"', nsMacro, pretty.parseNanoseconds('1ms 1μs'), '1ms 1μs')
test('prettyNanoseconds given 1ms 10μs returns "1ms 10μs"', nsMacro, pretty.parseNanoseconds('1ms 10μs'), '1ms 10μs')
test('prettyNanoseconds given 1ms 100μs returns "1ms 100μs"', nsMacro, pretty.parseNanoseconds('1ms 100μs'), '1ms 100μs')

test('prettyNanoseconds given 1s returns "1s"', nsMacro, pretty.parseNanoseconds('1s'), '1s')
test('prettyNanoseconds given 1s 1ms returns "1s 1ms"', nsMacro, pretty.parseNanoseconds('1s 1ms'), '1s 1ms')
test('prettyNanoseconds given 1s 10ms returns "1s 10ms"', nsMacro, pretty.parseNanoseconds('1s 10ms'), '1s 10ms')
test('prettyNanoseconds given 1s 100ms returns "1s 100ms"', nsMacro, pretty.parseNanoseconds('1s 100ms'), '1s 100ms')

test('prettyNanoseconds given 1m returns "1m"', nsMacro, pretty.parseNanoseconds('1m'), '1m')
test('prettyNanoseconds given 1m 1s returns "1m 1s"', nsMacro, pretty.parseNanoseconds('1m 1s'), '1m 1s')
test('prettyNanoseconds given 1m 10s returns "1m 10s"', nsMacro, pretty.parseNanoseconds('1m 10s'), '1m 10s')
test('prettyNanoseconds given 1m 100s returns "2m 40s"', nsMacro, pretty.parseNanoseconds('1m 100s'), '2m 40s')

test('prettyNanoseconds given 1h returns "1h"', nsMacro, pretty.parseNanoseconds('1h'), '1h')
test('prettyNanoseconds given 1h 1m returns "1h 1m"', nsMacro, pretty.parseNanoseconds('1h 1m'), '1h 1m')
test('prettyNanoseconds given 1h 10m returns "1h 10m"', nsMacro, pretty.parseNanoseconds('1h 10m'), '1h 10m')
test('prettyNanoseconds given 1h 100m returns "2h 40m"', nsMacro, pretty.parseNanoseconds('1h 100m'), '2h 40m')

test('prettyNanoseconds given 1d returns "1d"', nsMacro, pretty.parseNanoseconds('1d'), '1d')
test('prettyNanoseconds given 1d 1h returns "1d 1h"', nsMacro, pretty.parseNanoseconds('1d 1h'), '1d 1h')
test('prettyNanoseconds given 1d 10h returns "1d 10h"', nsMacro, pretty.parseNanoseconds('1d 10h'), '1d 10h')
test('prettyNanoseconds given 1d 100h returns "5d 4h"', nsMacro, pretty.parseNanoseconds('1d 100h'), '5d 4h')

// prettyMicroseconds

test('prettyMicroseconds given 1μs returns "1μs"', usMacro, pretty.parseMicroseconds('1μs'), '1μs')
test('prettyMicroseconds given 10μs returns "10μs"', usMacro, pretty.parseMicroseconds('10μs'), '10μs')
test('prettyMicroseconds given 100μs returns "0.1ms"', usMacro, pretty.parseMicroseconds('100μs'), '0.1ms')

test('prettyMicroseconds given 1ms returns "1ms"', usMacro, pretty.parseMicroseconds('1ms'), '1ms')
test('prettyMicroseconds given 1ms 49μs returns "1ms"', usMacro, pretty.parseMicroseconds('1ms 49μs'), '1ms')
test('prettyMicroseconds given 1ms 50μs returns "1.1ms"', usMacro, pretty.parseMicroseconds('1ms 50μs'), '1.1ms')

test('prettyMicroseconds given 1s returns "1s"', usMacro, pretty.parseMicroseconds('1s'), '1s')
test('prettyMicroseconds given 1s 1μs returns "1s 1μs"', usMacro, pretty.parseMicroseconds('1s 1μs'), '1s 1μs')
test('prettyMicroseconds given 1s 10μs returns "1s 10μs"', usMacro, pretty.parseMicroseconds('1s 10μs'), '1s 10μs')
test('prettyMicroseconds given 1s 100μs returns "1s 0.1ms"', usMacro, pretty.parseMicroseconds('1s 100μs'), '1s 0.1ms')
test('prettyMicroseconds given 1s 1ms returns "1s 1ms"', usMacro, pretty.parseMicroseconds('1s 1ms'), '1s 1ms')
test('prettyMicroseconds given 1s 10ms returns "1s 10ms"', usMacro, pretty.parseMicroseconds('1s 10ms'), '1s 10ms')
test('prettyMicroseconds given 1s 100ms returns "1s 100ms"', usMacro, pretty.parseMicroseconds('1s 100ms'), '1s 100ms')

test('prettyMicroseconds given 1m returns "1m"', usMacro, pretty.parseMicroseconds('1m'), '1m')
test('prettyMicroseconds given 1m 1s returns "1m 1s"', usMacro, pretty.parseMicroseconds('1m 1s'), '1m 1s')
test('prettyMicroseconds given 1m 10s returns "1m 10s"', usMacro, pretty.parseMicroseconds('1m 10s'), '1m 10s')
test('prettyMicroseconds given 1m 100s returns "2m 40s"', usMacro, pretty.parseMicroseconds('1m 100s'), '2m 40s')

test('prettyMicroseconds given 1h returns "1h"', usMacro, pretty.parseMicroseconds('1h'), '1h')
test('prettyMicroseconds given 1h 1m returns "1h 1m"', usMacro, pretty.parseMicroseconds('1h 1m'), '1h 1m')
test('prettyMicroseconds given 1h 10m returns "1h 10m"', usMacro, pretty.parseMicroseconds('1h 10m'), '1h 10m')
test('prettyMicroseconds given 1h 100m returns "2h 40m"', usMacro, pretty.parseMicroseconds('1h 100m'), '2h 40m')

test('prettyMicroseconds given 1d returns "1d"', usMacro, pretty.parseMicroseconds('1d'), '1d')
test('prettyMicroseconds given 1d 1h returns "1d 1h"', usMacro, pretty.parseMicroseconds('1d 1h'), '1d 1h')
test('prettyMicroseconds given 1d 10h returns "1d 10h"', usMacro, pretty.parseMicroseconds('1d 10h'), '1d 10h')
test('prettyMicroseconds given 1d 100h returns "5d 4h"', usMacro, pretty.parseMicroseconds('1d 100h'), '5d 4h')

// prettyMilliseconds

test('prettyMilliseconds given 1ms returns "1ms"', msMacro, pretty.parseMilliseconds('1ms'), '1ms')
test('prettyMilliseconds given 10ms returns "10ms"', msMacro, pretty.parseMilliseconds('10ms'), '10ms')
test('prettyMilliseconds given 100ms returns "0.1s"', msMacro, pretty.parseMilliseconds('100ms'), '0.1s')

test('prettyMilliseconds given 1s returns "1s"', msMacro, pretty.parseMilliseconds('1s'), '1s')
test('prettyMilliseconds given 1s 49ms returns "1s"', msMacro, pretty.parseMilliseconds('1s 49ms'), '1s')
test('prettyMilliseconds given 1s 50ms returns "1.1s"', msMacro, pretty.parseMilliseconds('1s 50ms'), '1.1s')

test('prettyMilliseconds given 1m returns "1m"', msMacro, pretty.parseMilliseconds('1m'), '1m')
test('prettyMilliseconds given 1m 1ms returns "1m 1ms"', msMacro, pretty.parseMilliseconds('1m 1ms'), '1m 1ms')
test('prettyMilliseconds given 1m 10ms returns "1m 10ms"', msMacro, pretty.parseMilliseconds('1m 10ms'), '1m 10ms')
test('prettyMilliseconds given 1m 100ms returns "1m 0.1s"', msMacro, pretty.parseMilliseconds('1m 100ms'), '1m 0.1s')
test('prettyMilliseconds given 1m 1s returns "1m 1s"', msMacro, pretty.parseMilliseconds('1m 1s'), '1m 1s')
test('prettyMilliseconds given 1m 10s returns "1m 10s"', msMacro, pretty.parseMilliseconds('1m 10s'), '1m 10s')
test('prettyMilliseconds given 1m 100s returns "2m 40s"', msMacro, pretty.parseMilliseconds('1m 100s'), '2m 40s')

test('prettyMilliseconds given 1h returns "1h"', msMacro, pretty.parseMilliseconds('1h'), '1h')
test('prettyMilliseconds given 1h 1m returns "1h 1m"', msMacro, pretty.parseMilliseconds('1h 1m'), '1h 1m')
test('prettyMilliseconds given 1h 10m returns "1h 10m"', msMacro, pretty.parseMilliseconds('1h 10m'), '1h 10m')
test('prettyMilliseconds given 1h 100m returns "2h 40m"', msMacro, pretty.parseMilliseconds('1h 100m'), '2h 40m')

test('prettyMilliseconds given 1d returns "1d"', msMacro, pretty.parseMilliseconds('1d'), '1d')
test('prettyMilliseconds given 1d 1h returns "1d 1h"', msMacro, pretty.parseMilliseconds('1d 1h'), '1d 1h')
test('prettyMilliseconds given 1d 10h returns "1d 10h"', msMacro, pretty.parseMilliseconds('1d 10h'), '1d 10h')
test('prettyMilliseconds given 1d 100h returns "5d 4h"', msMacro, pretty.parseMilliseconds('1d 100h'), '5d 4h')

// prettySeconds

test('prettySeconds given 1s returns "1s"', ssMacro, pretty.parseSeconds('1s'), '1s')
test('prettySeconds given 10s returns "10s"', ssMacro, pretty.parseSeconds('10s'), '10s')
test('prettySeconds given 100s returns "1m 40s"', ssMacro, pretty.parseSeconds('100s'), '1m 40s')

test('prettySeconds given 1m 1s returns "1m 1s"', ssMacro, pretty.parseSeconds('1m 1s'), '1m 1s')
test('prettySeconds given 1m 10s returns "1m 10s"', ssMacro, pretty.parseSeconds('1m 10s'), '1m 10s')
test('prettySeconds given 1m 100s returns "2m 40s"', ssMacro, pretty.parseSeconds('1m 100s'), '2m 40s')

test('prettySeconds given 1h 1s returns "1h"', ssMacro, pretty.parseSeconds('1h'), '1h')
test('prettySeconds given 1h 10s returns "1h 10s"', ssMacro, pretty.parseSeconds('1h 10s'), '1h 10s')
test('prettySeconds given 1h 100s returns "1h 1m 40s"', ssMacro, pretty.parseSeconds('1h 100s'), '1h 1m 40s')

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
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1μs 50ns')), '1.1μs')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1ms 50μs')), '1.1ms')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1s 50ms')), '1.1s')
  t.is(pretty.prettyHrtime(pretty.parseNanoseconds('1m 30s 50ms')), '1m 30.1s')
})

test('prettyHrtime given an array returns a formatted string', (t) => {
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('1μs 50ns'))]), '1.1μs')
  t.is(pretty.prettyHrtime([0, Number(pretty.parseNanoseconds('1ms 50μs'))]), '1.1ms')
  t.is(pretty.prettyHrtime([1, Number(pretty.parseNanoseconds('50ms'))]), '1.1s')
  t.is(pretty.prettyHrtime([90, Number(pretty.parseNanoseconds('50ms'))]), '1m 30.1s')
})
