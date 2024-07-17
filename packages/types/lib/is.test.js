import test from 'ava'

import * as values from './detail/values.js'
import * as is from './is.js'

const isUndefinedMacro = test.macro((t, input, expected) => {
  t.is(is.isUndefined(input), expected)
})

test('isUndefined returns true for an undefined value', isUndefinedMacro, values.undefinedValue, true)
test('isUndefined returns false for a null value', isUndefinedMacro, values.nullValue, false)

const isDefinedMacro = test.macro((t, input, expected) => {
  t.is(is.isDefined(input), expected)
})

test('isDefined returns false for an undefined value', isDefinedMacro, values.undefinedValue, false)
test('isDefined returns true for a null value', isDefinedMacro, values.nullValue, true)

const isNullMacro = test.macro((t, input, expected) => {
  t.is(is.isNull(input), expected)
})

test('isNull returns false for an undefined value', isNullMacro, values.undefinedValue, false)
test('isNull returns true for a null value', isNullMacro, values.nullValue, true)

const isBooleanMacro = test.macro((t, input, expected) => {
  t.is(is.isBoolean(input), expected)
})

test('isBoolean returns true for a boolean value', isBooleanMacro, values.booleanValue, true)
test('isBoolean returns false for a null value', isBooleanMacro, values.nullValue, false)
test('isBoolean returns false for a string containing a boolean value', isBooleanMacro, 'true', false)

const isIntegerMacro = test.macro((t, input, expected) => {
  t.is(is.isInteger(input), expected)
})

test('isInteger returns true for an integer value', isIntegerMacro, values.integerValue, true)
test('isInteger returns false for a big integer value', isIntegerMacro, values.bigIntValue, false)
test('isInteger returns false for a float value', isIntegerMacro, values.floatValue, false)
test('isInteger returns false for NaN value', isIntegerMacro, values.NaNValue, false)
test('isInteger returns false for +Infinity value', isIntegerMacro, values.plusInfinityValue, false)
test('isInteger returns false for -Infinity value', isIntegerMacro, values.minusInfinityValue, false)
test('isInteger returns false for a string containing an integer value', isIntegerMacro, '1', false)

const isNumberMacro = test.macro((t, input, expected) => {
  t.is(is.isNumber(input), expected)
})

test('isNumber returns true for an integer value', isNumberMacro, values.integerValue, true)
test('isNumber returns true for a float value', isNumberMacro, values.floatValue, true)
test('isNumber returns false for a big integer value', isNumberMacro, values.bigIntValue, false)
test('isNumber returns false for NaN value', isNumberMacro, values.NaNValue, false)
test('isNumber returns false for +Infinity', isNumberMacro, values.plusInfinityValue, false)
test('isNumber returns false for -Infinity', isNumberMacro, values.minusInfinityValue, false)
test('isNumber returns false for a string containing an integer number', isNumberMacro, '1', false)
test('isNumber returns false for a string containing a float number', isNumberMacro, '1.2', false)

const isBigIntMacro = test.macro((t, input, expected) => {
  t.is(is.isBigInt(input), expected)
})

test('isBigInt returns true for a big integer value', isBigIntMacro, values.bigIntValue, true)
test('isBigInt returns false for a integer value', isBigIntMacro, values.integerValue, false)
test('isBigInt returns false for a float value', isBigIntMacro, values.floatValue, false)
test('isBigInt returns false for NaN value', isBigIntMacro, values.NaNValue, false)
test('isBigInt returns false for +Infinity value', isBigIntMacro, values.plusInfinityValue, false)
test('isBigInt returns false for -Infinity value', isBigIntMacro, values.minusInfinityValue, false)
test('isBigInt returns false for a string containing big integer value', isBigIntMacro, '999999999999999999999999999', false)

const isStringMacro = test.macro((t, input, expected) => {
  t.is(is.isString(input), expected)
})

test('isString returns true for a string', isStringMacro, values.stringValue, true)
test('isString returns false for an integer', isStringMacro, values.integerValue, false)

const isArrayMacro = test.macro((t, input, expected) => {
  t.is(is.isArray(input), expected)
})

test('isArray returns true for an array', isArrayMacro, values.arrayValue, true)
test('isArray returns false for a typed array', isArrayMacro, values.typedArrayValue, false)
test('isArray returns false for an object', isArrayMacro, values.objectValue, false)

const isFunctionMacro = test.macro((t, input, expected) => {
  t.is(is.isFunction(input), expected)
})

test('isFunction returns true for a function', isFunctionMacro, values.functionValue, true)
test('isFunction returns false for an object', isFunctionMacro, values.objectValue, false)

const isObjectMacro = test.macro((t, input, expected) => {
  t.is(is.isObject(input), expected)
})

test('isObject returns true for an object', isObjectMacro, values.objectValue, true)
test('isObject returns false for a function', isObjectMacro, values.functionValue, false)

const isPlainObjectMacro = test.macro((t, input, expected) => {
  t.is(is.isPlainObject(input), expected)
})

test('isPlainObject returns true for an object', isPlainObjectMacro, values.objectValue, true)
test('isPlainObject returns true for an object with the prototype of null', isPlainObjectMacro, Object.create(null), true)
test('isPlainObject returns false for a class', isPlainObjectMacro, values.classValue, false)
test('isPlainObject returns false for a function', isPlainObjectMacro, values.functionValue, false)

const isIterableMacro = test.macro((t, input, expected) => {
  t.is(is.isIterable(input), expected)
})

test('isIterable returns true for a string', isIterableMacro, values.stringValue, true)
test('isIterable returns true for an array', isIterableMacro, values.arrayValue, true)
test('isIterable returns true for a typed array', isIterableMacro, values.typedArrayValue, true)
test('isIterable returns true for a map', isIterableMacro, values.mapValue, true)
test('isIterable returns true for a set', isIterableMacro, values.setValue, true)
test('isIterable returns false for an object', isIterableMacro, values.objectValue, false)

const isSymbolMacro = test.macro((t, input, expected) => {
  t.is(is.isSymbol(input), expected)
})

test('isSymbol returns true for a symbol', isSymbolMacro, values.symbolValue, true)
test('isSymbol returns false for a string', isSymbolMacro, values.stringValue, false)

const isPromiseMacro = test.macro((t, input, expected) => {
  t.is(is.isPromise(input), expected)
})

test('isPromise returns true for a promise', isPromiseMacro, values.promiseValue, true)
test('isPromise returns true for a promise-like', isPromiseMacro, values.promiseLikeValue, true)
test('isPromise returns false if then is not a function', isPromiseMacro, { then: true }, false)
