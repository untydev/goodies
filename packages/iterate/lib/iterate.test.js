import test from 'ava'
import iterate, { iterateIterable, iterateObject, iterateMap } from './iterate.js'

test('iterate calls the given function for each array element passing that element as first argument', (t) => {
  const elems = []
  iterate(['a', 'b', 'c'], (elem) => elems.push(elem))
  t.deepEqual(elems, ['a', 'b', 'c'])
})

test('iterate calls the given function for each array element passing an index as second argument', (t) => {
  const indices = []
  iterate(['a', 'b', 'c'], (elem, index) => indices.push(index))
  t.deepEqual(indices, [0, 1, 2])
})

test('iterate calls the given function for each array element passing that array as third argument', (t) => {
  const array = ['a', 'b', 'c']
  const arrays = []
  iterate(array, (elem, index, array) => arrays.push(array))
  t.deepEqual(arrays, [array, array, array])
})

test('iterate calls the given function for each character passing that character as first argument', (t) => {
  const chars = []
  iterate('abc', (char) => chars.push(char))
  t.deepEqual(chars, ['a', 'b', 'c'])
})

test('iterate calls the given function for each character passing an index as second argument', (t) => {
  const indices = []
  iterate('abc', (char, index) => indices.push(index))
  t.deepEqual(indices, [0, 1, 2])
})

test('iterate calls the given function for each character passing the string as third argument', (t) => {
  const strings = []
  iterate('abc', (char, index, string) => strings.push(string))
  t.deepEqual(strings, ['abc', 'abc', 'abc'])
})

test('iterate calls the given function for each set element passing that element as first argument', (t) => {
  const elems = []
  iterate(new Set(['a', 'b', 'c']), (elem) => elems.push(elem))
  t.deepEqual(elems, ['a', 'b', 'c'])
})

test('iterate calls the given function for each set element passing an index as second argument', (t) => {
  const indices = []
  iterate(new Set(['a', 'b', 'c']), (elem, index) => indices.push(index))
  t.deepEqual(indices, [0, 1, 2])
})

test('iterate calls the given function for each set element passing that set as third argument', (t) => {
  const set = new Set(['a', 'b', 'c'])
  const sets = []
  iterate(set, (elem, index, set) => sets.push(set))
  t.deepEqual(sets, [set, set, set])
})

test('iterate calls the given function for each key-value pair passing the value as first argument', (t) => {
  const values = []
  iterate(new Map([[1, 'a'], [2, 'b'], [3, 'c']]), (value) => values.push(value))
  t.deepEqual(values, ['a', 'b', 'c'])
})

test('iterate calls the given function for each key-value pair passing the key as second argument', (t) => {
  const keys = []
  iterate(new Map([[1, 'a'], [2, 'b'], [3, 'c']]), (value, key) => keys.push(key))
  t.deepEqual(keys, [1, 2, 3])
})

test('iterate calls the given function for each key-value pair passing the map as third argument', (t) => {
  const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
  const maps = []
  iterate(map, (value, key, map) => maps.push(map))
  t.deepEqual(maps, [map, map, map])
})

test('iterate calls the given function for each key passing a value as first argument', (t) => {
  const values = []
  iterate({ a: 1, b: 2, c: 3 }, (value) => values.push(value))
  t.deepEqual(values, [1, 2, 3])
})

test('iterate calls the given function for each key passing that key as second argument', (t) => {
  const keys = []
  iterate({ a: 1, b: 2, c: 3 }, (value, key) => keys.push(key))
  t.deepEqual(keys, ['a', 'b', 'c'])
})

test('iterate calls the given function for each key passing the object as third argument', (t) => {
  const object = { a: 1, b: 2, c: 3 }
  const objects = []
  iterate(object, (value, key, object) => objects.push(object))
  t.deepEqual(objects, [object, object, object])
})

test('iterate calls the given function for each integer between 0 and 10', (t) => {
  const integers = []
  iterate(10, (value) => integers.push(value))
  t.deepEqual(integers, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

test('iterate calls the given function for each integer between 0 and -10', (t) => {
  const integers = []
  iterate(-10, (value) => integers.push(value))
  t.deepEqual(integers, [-0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
})

test('iterate does not call the given function if 0 is passed', (t) => {
  const integers = []
  iterate(0, (value) => integers.push(value))
  t.deepEqual(integers, [])
})

test('iterate throws if first argument cannot be iterated over', (t) => {
  t.throws(() => iterate(null, () => {}), { instanceOf: TypeError })
  t.throws(() => iterate(1.1, () => {}), { instanceOf: TypeError })
})

test('iterateIterable throws if first argument is not iterable', (t) => {
  t.throws(() => iterateIterable(null, () => {}), { instanceOf: TypeError })
})

test('iterateIterable throws if second argument is not a function', (t) => {
  t.throws(() => iterateIterable([], null), { instanceOf: TypeError })
})

test('iterateObject throws if first argument is not an object', (t) => {
  t.throws(() => iterateObject(null, () => {}), { instanceOf: TypeError })
})

test('iterateObject throws if second argument is not a function', (t) => {
  t.throws(() => iterateObject({}, null), { instanceOf: TypeError })
})

test('iterateMap throws if first argument is not a map', (t) => {
  t.throws(() => iterateMap({}, () => {}), { instanceOf: TypeError })
})

test('iterateMap throws if second argument is not a function', (t) => {
  t.throws(() => iterateMap(new Map(), null), { instanceOf: TypeError })
})
