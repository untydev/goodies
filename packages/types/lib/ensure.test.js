import test from 'ava'

import * as values from './detail/values.js'
import * as ensure from './ensure.js'

test('ensureUndefined does not throw for an undefined value', (t) => {
  t.is(ensure.ensureUndefined(values.undefinedValue), values.undefinedValue)
})

test('ensureUndefined throws for a null value', (t) => {
  t.throws(() => ensure.ensureUndefined(values.nullValue), { instanceOf: TypeError })
})

test('ensureDefined does not throw for a null value', (t) => {
  t.is(ensure.ensureDefined(values.nullValue), values.nullValue)
})

test('ensureDefined throws for an undefined value', (t) => {
  t.throws(() => ensure.ensureDefined(values.undefinedValue), { instanceOf: TypeError })
})

test('ensureNull does not throw for a null value', (t) => {
  t.is(ensure.ensureNull(values.nullValue), values.nullValue)
})

test('ensureNull throws for an undefined value', (t) => {
  t.throws(() => ensure.ensureNull(values.undefinedValue), { instanceOf: TypeError })
})

test('ensureBoolean does not throw for a boolean value', (t) => {
  t.is(ensure.ensureBoolean(values.booleanValue), values.booleanValue)
})

test('ensureBoolean throws for an integer value', (t) => {
  t.throws(() => ensure.ensureBoolean(values.integerValue), { instanceOf: TypeError })
})

test('ensureBoolean throws for a string containing a boolean value', (t) => {
  t.throws(() => ensure.ensureBoolean('true'), { instanceOf: TypeError })
})

test('ensureInteger does not throw for an integer value', (t) => {
  t.is(ensure.ensureInteger(values.integerValue), values.integerValue)
})

test('ensureInteger throws for a big integer value', (t) => {
  t.throws(() => ensure.ensureInteger(values.bigIntValue), { instanceOf: TypeError })
})

test('ensureInteger throws for a float value', (t) => {
  t.throws(() => ensure.ensureInteger(values.floatValue), { instanceOf: TypeError })
})

test('ensureInteger throws for NaN value', (t) => {
  t.throws(() => ensure.ensureInteger(values.NaNValue), { instanceOf: TypeError })
})

test('ensureInteger throws for Infinity values', (t) => {
  t.throws(() => ensure.ensureInteger(values.plusInfinityValue), { instanceOf: TypeError })
  t.throws(() => ensure.ensureInteger(values.minusInfinityValue), { instanceOf: TypeError })
})

test('ensureInteger throws for a string containing an integer value', (t) => {
  t.throws(() => ensure.ensureInteger('1'), { instanceOf: TypeError })
})

test('ensureNumber does not throws for a number', (t) => {
  t.is(ensure.ensureNumber(values.integerValue), values.integerValue)
  t.is(ensure.ensureNumber(values.floatValue), values.floatValue)
})

test('ensureNumber throws for a big integer value', (t) => {
  t.throws(() => ensure.ensureNumber(values.bigIntValue), { instanceOf: TypeError })
})

test('ensureNumber throws for NaN value', (t) => {
  t.throws(() => ensure.ensureNumber(values.NaNValue), { instanceOf: TypeError })
})

test('ensureNumber throws for infinite values', (t) => {
  t.throws(() => ensure.ensureNumber(values.plusInfinityValue), { instanceOf: TypeError })
  t.throws(() => ensure.ensureNumber(values.minusInfinityValue), { instanceOf: TypeError })
})

test('ensureNumber throws for a string containing a number', (t) => {
  t.throws(() => ensure.ensureNumber('1'), { instanceOf: TypeError })
  t.throws(() => ensure.ensureNumber('1.2'), { instanceOf: TypeError })
})

test('ensureBigInt does not throw for a big integer value', (t) => {
  t.is(ensure.ensureBigInt(values.bigIntValue), values.bigIntValue)
})

test('ensureBigInt throws for a number value', (t) => {
  t.throws(() => ensure.ensureBigInt(values.integerValue), { instanceOf: TypeError })
  t.throws(() => ensure.ensureBigInt(values.floatValue), { instanceOf: TypeError })
})

test('ensureBigInt throws for NaN value', (t) => {
  t.throws(() => ensure.ensureBigInt(values.NaNValue), { instanceOf: TypeError })
})

test('ensureBigInt throws for infinite values', (t) => {
  t.throws(() => ensure.ensureBigInt(values.plusInfinityValue), { instanceOf: TypeError })
  t.throws(() => ensure.ensureBigInt(values.minusInfinityValue), { instanceOf: TypeError })
})

test('ensureBigInt throws for a string containing a big integer value', (t) => {
  t.throws(() => ensure.ensureBigInt('999999999999999999999999999'), { instanceOf: TypeError })
})

test('ensureString does not throw for a string', (t) => {
  t.is(ensure.ensureString(values.stringValue), values.stringValue)
})

test('ensureString throws for an integer value', (t) => {
  t.throws(() => ensure.ensureString(values.integerValue), { instanceOf: TypeError })
})

test('ensureArray does not throw for an array', (t) => {
  t.deepEqual(ensure.ensureArray(values.arrayValue), values.arrayValue)
})

test('ensureArray throws for a typed array', (t) => {
  t.throws(() => ensure.ensureArray(values.typedArrayValue), { instanceOf: TypeError })
})

test('ensureArray throws for an object', (t) => {
  t.throws(() => ensure.ensureArray(values.objectValue), { instanceOf: TypeError })
})

test('ensureFunction does not throw for a function', (t) => {
  t.deepEqual(ensure.ensureFunction(values.functionValue), values.functionValue)
})

test('ensureFunction throws for an object', (t) => {
  t.throws(() => ensure.ensureFunction(values.objectValue), { instanceOf: TypeError })
})

test('ensureObject does not throws for an object', (t) => {
  t.deepEqual(ensure.ensureObject(values.objectValue), values.objectValue)
})

test('ensureObject throws for a function', (t) => {
  t.throws(() => ensure.ensureObject(values.functionValue), { instanceOf: TypeError })
})

test('ensurePlainObject does not throw for an object created from object literal', (t) => {
  t.deepEqual(ensure.ensurePlainObject(values.objectValue), values.objectValue)
})

test('ensurePlainObject does not throw for an object with the prototype of null', (t) => {
  const o = Object.create(null)
  t.deepEqual(ensure.ensurePlainObject(o), o)
})

test('ensurePlainObject throws for a class', (t) => {
  t.throws(() => ensure.ensurePlainObject(values.classValue), { instanceOf: TypeError })
})

test('ensurePlainObject throws for a function', (t) => {
  t.throws(() => ensure.ensurePlainObject(values.functionValue), { instanceOf: TypeError })
})

test('ensureIterable does not throw for iterables', (t) => {
  t.deepEqual(ensure.ensureIterable(values.stringValue), values.stringValue)
  t.deepEqual(ensure.ensureIterable(values.arrayValue), values.arrayValue)
  t.deepEqual(ensure.ensureIterable(values.typedArrayValue), values.typedArrayValue)
  t.deepEqual(ensure.ensureIterable(values.setValue), values.setValue)
  t.deepEqual(ensure.ensureIterable(values.mapValue), values.mapValue)
})

test('ensureIterable throws for an object', (t) => {
  t.throws(() => ensure.ensureIterable(values.objectValue), { instanceOf: TypeError })
})

test('ensureSymbol does not throw for a symbol', (t) => {
  t.is(ensure.ensureSymbol(values.symbolValue), values.symbolValue)
})

test('ensureSymbol throws for a string', (t) => {
  t.throws(() => ensure.ensureSymbol(values.stringValue), { instanceOf: TypeError })
})

test('ensurePromise does not throws for a promise', (t) => {
  t.deepEqual(ensure.ensurePromise(values.promiseValue), values.promiseValue)
})

test('ensurePromise does not throws for a promise-like value', (t) => {
  t.deepEqual(ensure.ensurePromise(values.promiseLikeValue), values.promiseLikeValue)
})

test('ensurePromise throws if then is not a function', (t) => {
  t.throws(() => ensure.ensurePromise({ then: true }), { instanceOf: TypeError })
})
