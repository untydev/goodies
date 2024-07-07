import test from 'ava'
import { has, get, set, join, split } from './props.js'

// has

test('has throws if path is undefined', (t) => {
  t.throws(() => has({}), { instanceOf: TypeError })
  t.throws(() => has({}, undefined), { instanceOf: TypeError })
})

test('has throws if path is float', (t) => {
  t.throws(() => has({}, 1.2), { instanceOf: TypeError })
})

test('has returns false if named property does not exist', (t) => {
  t.false(has({ foo: { bar: 'baz' } }, 'foo.bar.baz'))
  t.false(has({ foo: { bar: 'baz' } }, 'foo.baz'))
})

test('has returns true if named property does exist', (t) => {
  t.true(has({ foo: { bar: 'baz' } }, 'foo'))
  t.true(has({ foo: { bar: 'baz' } }, 'foo.bar'))
})

test('has returns false if indexed property does not exist', (t) => {
  t.false(has({ foo: [{ bar: 'baz' }] }, 'foo.bar'))
  t.false(has({ foo: [{ bar: 'baz' }] }, 'foo.0.baz'))
  t.false(has([], 1))
})

test('has returns true if indexed property does exist', (t) => {
  t.true(has([{ bar: 'baz' }], 0))
  t.true(has({ foo: [{ bar: 'baz' }] }, 'foo.0.bar'))
  t.true(has({ foo: { 0: { bar: 'baz' } } }, 'foo.0.bar'))
})

test('has returns false if object is null or undefined', (t) => {
  t.false(has(null, 'foo.bar'))
  t.false(has(undefined, 'foo.bar'))
})

test('has returns false if property is undefined', (t) => {
  t.false(has({ foo: { bar: undefined } }, 'foo.bar'))
})

test('has returns false if path ends with a separator', (t) => {
  t.false(has({ foo: { bar: 'baz' } }, 'foo.bar.'))
})

test('has returns false if path starts with a separator', (t) => {
  t.false(has({ foo: { bar: 'baz' } }, '.foo.bar'))
})

test('has returns false if path has adjacent separators', (t) => {
  t.false(has({ foo: { bar: 'baz' } }, 'foo..bar'))
})

test('has returns true if path is empty and object is defined', (t) => {
  t.true(has({ foo: { bar: 'baz' } }, ''))
})

test('has returns false if path is empty and object is not defined', (t) => {
  t.false(has(undefined, ''))
})

// get

test('get throws if path is not a string', (t) => {
  t.throws(() => get({ foo: 'bar' }, null), { instanceOf: TypeError })
  t.throws(() => get({ foo: 'bar' }, {}), { instanceOf: TypeError })
})

test('get throws if property is not defined', (t) => {
  t.throws(() => get({ foo: { bar: 'baz' } }, 'foo.baz'), {
    instanceOf: Error, message: '\'foo.baz\' object property not found'
  })
  t.throws(() => get({ foo: [{ bar: 'baz' }] }, 'foo.1'), {
    instanceOf: Error, message: '\'foo.1\' object property not found'
  })
})

test('get throws if object cannot be enumerated', (t) => {
  t.throws(() => get(null, 'foo.bar'), {
    instanceOf: Error, message: '\'foo.bar\' object property not found'
  })
  t.throws(() => get(undefined, 'foo.bar'), {
    instanceOf: Error, message: '\'foo.bar\' object property not found'
  })
  t.throws(() => get(1, 'foo.bar'), {
    instanceOf: Error, message: '\'foo.bar\' object property not found'
  })
  t.throws(() => get('', 'foo.bar'), {
    instanceOf: Error, message: '\'foo.bar\' object property not found'
  })
})

test('get returns fallback if property is not defined', (t) => {
  t.is(get([], 0, 'fallback'), 'fallback')
  t.is(get([], '0', 'fallback'), 'fallback')
  t.is(get({ foo: { bar: 'baz' } }, 'foo.baz', 'fallback'), 'fallback')
  t.is(get({ foo: [{ bar: 'baz' }] }, 'foo.1', 'fallback'), 'fallback')
})

test('get returns fallback if object cannot be enumerated', (t) => {
  t.is(get(null, 'foo.bar', 'fallback'), 'fallback')
  t.is(get(undefined, 'foo.bar', 'fallback'), 'fallback')
  t.is(get(1, 'foo.bar', 'fallback'), 'fallback')
  t.is(get('', 'foo.bar', 'fallback'), 'fallback')
})

test('get returns value if property is defined', (t) => {
  t.deepEqual(get([{ foo: 'bar' }], ''), [{ foo: 'bar' }])
  t.deepEqual(get([{ foo: 'bar' }], '0'), { foo: 'bar' })
  t.deepEqual(get([{ foo: 'bar' }], 0), { foo: 'bar' })
  t.deepEqual(get({ foo: 'bar' }, ''), { foo: 'bar' })
  t.is(get([{ foo: 'bar' }], '0.foo'), 'bar')
  t.is(get({ foo: 'bar' }, 'foo'), 'bar')
  t.is(get({ foo: { bar: 'baz' } }, 'foo.bar'), 'baz')
  t.is(get({ foo: [{ bar: 'baz' }] }, 'foo.0.bar'), 'baz')
})

// set

test('set throws if path is not a string or number', (t) => {
  t.throws(() => set({}, null), { instanceOf: TypeError })
  t.throws(() => set({}, {}), { instanceOf: TypeError })
})

test('set is noop if path is an empty string', (t) => {
  t.deepEqual(set({}, '', 'foo'), {})
  t.deepEqual(set([], '', 'foo'), [])
})

test('set throws if object cannot be enumerated', (t) => {
  t.throws(() => set(null, 'foo.bar', 'baz'), { instanceOf: Error })
  t.throws(() => set(undefined, 'foo.bar'), { instanceOf: Error })
  t.throws(() => set(1, 'foo.bar'), { instanceOf: Error })
  t.throws(() => set('', 'foo.bar'), { instanceOf: Error })
})

test('set creates missing object properties', (t) => {
  t.deepEqual(set({}, 0, 'foo'), { 0: 'foo' })
  t.deepEqual(set({}, '0', 'foo'), { 0: 'foo' })
  t.deepEqual(set({}, 'foo', 'bar'), { foo: 'bar' })
})

test('set creates missing array elements', (t) => {
  t.deepEqual(set([], 0, 'foo'), ['foo'])
  t.deepEqual(set([], '0', 'foo'), ['foo'])
  t.deepEqual(set([], 1, 'foo'), [undefined, 'foo'])
  t.deepEqual(set([], '1', 'foo'), [undefined, 'foo'])
  t.deepEqual(set([], '0.foo', 'bar'), [{ foo: 'bar' }])
  t.deepEqual(set({}, 'foo.0', 'bar'), { foo: ['bar'] })
  t.deepEqual(set([], '1.foo', 'bar'), [undefined, { foo: 'bar' }])
  t.deepEqual(set({}, 'foo.1', 'bar'), { foo: [undefined, 'bar'] })
})

test('set overrides existing object properties', (t) => {
  t.deepEqual(set({ foo: 'bar' }, 'foo', 'baz'), { foo: 'baz' })
  t.deepEqual(set({ foo: { bar: 'baz' } }, 'foo.bar', 'qux'), { foo: { bar: 'qux' } })
})

test('set overrides existing array indices', (t) => {
  t.deepEqual(set(['foo', 'bar'], 1, 'baz'), ['foo', 'baz'])
  t.deepEqual(set(['foo', 'bar'], '1', 'baz'), ['foo', 'baz'])
})

test('set creates object properties for missing empty segments', (t) => {
  t.deepEqual(set({}, '.', 'foo'), { '': { '': 'foo' } })
  t.deepEqual(set({}, '..', 'foo'), { '': { '': { '': 'foo' } } })
})

test('set modifies array size during creating missing indices', (t) => {
  t.is(set([], 0, 'foo').length, 1)
  t.is(set([], 1, 'foo').length, 2)
})

test('set assigns undefined value if specified', (t) => {
  t.deepEqual(set({}, 'foo'), { foo: undefined })
  t.deepEqual(set({}, 'foo.bar'), { foo: { bar: undefined } })
})

// join

test('join throws if path is not a string or number', (t) => {
  t.throws(() => split(), { instanceOf: TypeError })
  t.throws(() => split(null), { instanceOf: TypeError })
  t.throws(() => split({}), { instanceOf: TypeError })
})

test('join throws if path segment is null or undefined', (t) => {
  t.throws(() => join('a', null, 'c'), { instanceOf: TypeError })
  t.throws(() => join('a', undefined, 'c'), { instanceOf: TypeError })
})

test('join returns a string containing joined path segments', (t) => {
  t.is(join('foo'), 'foo')
  t.is(join('.foo'), '.foo')
  t.is(join('foo', 0, 'bar'), 'foo.0.bar')
})

// split

test('split throws an error if path is undefined', (t) => {
  t.throws(() => split(), { instanceOf: TypeError })
  t.throws(() => split(undefined), { instanceOf: TypeError })
})

test('split throws an error if path is null', (t) => {
  t.throws(() => split(null), { instanceOf: TypeError })
})

test('split throws an error if path is a float', (t) => {
  t.throws(() => split(1.2), { instanceOf: TypeError })
})

test('split returns an array containing one segment if path is a number', (t) => {
  t.deepEqual(split(1), [1])
})

test('split returns an array of multiple path segments if path is a string with path separators', (t) => {
  t.deepEqual(split('foo.0.bar'), ['foo', '0', 'bar'])
})

test('split returns an array containing one segment if path is a string without path separators', (t) => {
  t.deepEqual(split('foo'), ['foo'])
})
