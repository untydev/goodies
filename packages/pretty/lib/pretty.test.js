import test from 'ava'

import pretty from './pretty.js'

const nsMacro = test.macro((t, input, expected) => {
  t.is(pretty.ns(input), expected)
})

test('pretty.ns given 0ns returns "0ns"', nsMacro, 0, '0ns')
test('pretty.ns given 1ns returns "1ns"', nsMacro, 1, '1ns')
test('pretty.ns given 10ns returns "10ns"', nsMacro, 10, '10ns')
test('pretty.ns given 100ns returns "0.1μs"', nsMacro, 1e2, '0.1μs')
test('pretty.ns given 1μs 0ns returns "1μs"', nsMacro, 1e3, '1μs')
test('pretty.ns given 1μs 49ns returns "1μs"', nsMacro, 1e3, '1μs')
test('pretty.ns given 1μs 50ns returns "1.1μs"', nsMacro, 1e3 + 50, '1.1μs')
test('pretty.ns given 10μs 0ns returns "10μs', nsMacro, 1e4, '10μs')
test('pretty.ns given 100μs 0ns returns "100μs', nsMacro, 1e5, '100μs')
test('pretty.ns given 1ms 0μs 0ns returns "1ms"', nsMacro, 1e6, '1ms')
test('pretty.ns given 10ms 0μs 0ns returns "10ms"', nsMacro, 1e7, '10ms')
test('pretty.ns given 100ms 0μs 0ns returns "100ms"', nsMacro, 1e8, '100ms')
test('pretty.ns given 1s 0ms 0μs 0ns returns "1s"', nsMacro, 1e9, '1s')

const msMacro = test.macro((t, input, expected) => {
  t.is(pretty.ms(input), expected)
})

test('pretty.ms given 0ms returns "0ms"', msMacro, 0, '0ms')
test('pretty.ms given 1ms returns "1ms"', msMacro, 1, '1ms')
test('pretty.ms given 10ms returns "10ms"', msMacro, 10, '10ms')
test('pretty.ms given 100ms returns "0.1s"', msMacro, 100, '0.1s')
test('pretty.ms given 1s 0ms returns "1s"', msMacro, 1000, '1s')
test('pretty.ms given 1s 49ms returns "1s"', msMacro, 1049, '1s')
test('pretty.ms given 1s 50ms returns "1.1s"', msMacro, 1050, '1.1s')
test('pretty.ms given 1s 999ms returns "2s"', msMacro, 1999, '2s')
test('pretty.ms given 1m 0s 0ms returns "1m"', msMacro, 60 * 1000, '1m')
test('pretty.ms given 1m 0s 1ms returns "1m 1ms', msMacro, 60 * 1000 + 1, '1m 1ms')
test('pretty.ms given 1m 0s 100ms returns "1m 0.1s"', msMacro, 60 * 1000 + 100, '1m 0.1s')
test('pretty.ms given 1m 1s 0ms returns "1m 1s"', msMacro, 60 * 1000 + 1000, '1m 1s')
test('pretty.ms given 1m 1s 1ms returns "1m 1s"', msMacro, 60 * 1000 + 1001, '1m 1s')
test('pretty.ms given 1m 1s 100ms returns "1m 1.1s"', msMacro, 60 * 1000 + 1100, '1m 1.1s')
