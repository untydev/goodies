import test from 'ava'

import makeOptions from './options.js'

test('makeOptions creates a new object', (t) => {
  const inputOptions = { a: true }
  const defaultOptions = { a: false }
  const options = makeOptions(inputOptions, {})
  t.not(options, inputOptions)
  t.not(options, defaultOptions)
})

test('makeOptions does not modify arguments', (t) => {
  const inputOptions = { a: true }
  const defaultOptions = { b: true }
  makeOptions(inputOptions, defaultOptions)
  t.deepEqual(inputOptions, { a: true })
  t.deepEqual(defaultOptions, { b: true })
})

test('makeOptions overrides default options', (t) => {
  const inputOptions = { a: true }
  const defaultOptions = { a: false }
  t.deepEqual(makeOptions(inputOptions, defaultOptions), inputOptions)
})

test('makeOptions throws if input options is not a plain object', (t) => {
  class X {}
  t.throws(() => makeOptions(undefined, {}), { instanceOf: TypeError })
  t.throws(() => makeOptions(null, {}), { instanceOf: TypeError })
  t.throws(() => makeOptions('', {}), { instanceOf: TypeError })
  t.throws(() => makeOptions(new X(), { instanceOf: TypeError }))
})

test('makeOptions throws if default options is not a plain object', (t) => {
  class X {}
  t.throws(() => makeOptions({}, undefined), { instanceOf: TypeError })
  t.throws(() => makeOptions({}, null), { instanceOf: TypeError })
  t.throws(() => makeOptions({}, ''), { instanceOf: TypeError })
  t.throws(() => makeOptions({}, new X()), { instanceOf: TypeError })
})

test('makeOptions deeply merges object properties', (t) => {
  const inputOptions = { a: {}, b: { x: true } }
  const defaultOptions = { a: { y: false } }
  t.deepEqual(makeOptions(inputOptions, defaultOptions), { a: { y: false }, b: { x: true } })
})

test('makeOptions replaces arrays from default options', (t) => {
  const inputOptions = { a: [true] }
  const defaultOptions = { a: [false] }
  const outputOptions = makeOptions(inputOptions, defaultOptions)
  t.deepEqual(outputOptions, inputOptions)
})
