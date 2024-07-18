import test from 'ava'

import merge from './merge.js'

test('merge creates destination if not provided', (t) => {
  t.deepEqual(merge(undefined, {}), {})
})

test('merge throws if destination is not an object', (t) => {
  t.throws(() => merge(null, {}), { instanceOf: TypeError })
  t.throws(() => merge('', {}), { instanceOf: TypeError })
  t.throws(() => merge(1, {}), { instanceOf: TypeError })
})

test('merge creates source if not provided', (t) => {
  t.deepEqual(merge({}, undefined), {})
})

test('merge throws if source is undefined', (t) => {
  t.throws(() => merge({}, null), { instanceOf: TypeError })
  t.throws(() => merge({}, ''), { instanceOf: TypeError })
  t.throws(() => merge({}, 1), { instanceOf: TypeError })
})

test('merge modifies the destination object', (t) => {
  const source = { b: true }
  const destination = { a: true }
  t.is(merge(destination, source), destination)
  t.deepEqual(destination, { a: true, ...source })
})

test('merge ignores undefined properties in source', (t) => {
  const source = { a: true, b: undefined, c: undefined }
  const destination = { b: true }
  t.deepEqual(merge(destination, source), { a: source.a, b: destination.b })
})

test('merge overwrites undefined properties in destination', (t) => {
  const source = { a: { b: true } }
  const destination = { a: undefined }
  t.deepEqual(merge(destination, source), source)
})

test('merge clones only plain objects', (t) => {
  const source = { a: new Set() }
  const destination = {}
  t.deepEqual(merge(destination, source), source)
  t.is(destination.a, source.a)
})

test('merge clones arrays recursively', (t) => {
  const source = { a: [{ a: true }, false, { b: true }] }
  const destination = { a: [true] }
  t.deepEqual(merge(destination, source), source)
  t.not(source.a, destination.a)
  t.not(source.a[0], destination.a[0])
  t.not(source.a[2], destination.a[2])
})

test('merge returns destination', (t) => {
  const source = { a: true }
  const destination = { b: true }
  t.is(merge(destination, source), destination)
})
