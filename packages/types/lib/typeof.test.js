import test from 'ava'
import * as labels from './detail/labels.js'
import * as values from './detail/values.js'
import { typeOf } from './typeof.js'

test('typeOf() returns label for undefined value', (t) => {
  t.is(typeOf(values.undefinedValue), labels.undefinedType)
})

test('typeOf() returns label for null value', (t) => {
  t.is(typeOf(values.nullValue), labels.nullType)
})

test('typeOf() returns label for boolean value', (t) => {
  t.is(typeOf(values.booleanValue), labels.booleanType)
})

test('typeOf() returns label for number value', (t) => {
  t.is(typeOf(values.integerValue), labels.numberType)
  t.is(typeOf(values.floatValue), labels.numberType)
})

test('typeOf() returns label for BigInt value', (t) => {
  t.is(typeOf(values.bigIntValue), labels.bigIntType)
})

test('typeOf() returns label for NaN value', (t) => {
  t.is(typeOf(values.NaNValue), labels.NaNType)
})

test('typeOf() returns label for infinite number', (t) => {
  t.is(typeOf(values.plusInfinityValue), labels.infinityType)
  t.is(typeOf(values.minusInfinityValue), labels.infinityType)
})

test('typeOf() returns label for string value', (t) => {
  t.is(typeOf(values.stringValue), labels.stringType)
})

test('typeOf() returns label for array value', (t) => {
  t.is(typeOf(values.arrayValue), labels.objectType)
  t.is(typeOf(values.typedArrayValue), labels.objectType)
})

test('typeOf() returns label for function value', (t) => {
  t.is(typeOf(values.functionValue), labels.functionType)
})

test('typeOf() returns label for symbol value', (t) => {
  t.is(typeOf(values.symbolValue), labels.symbolType)
})

test('typeOf() returns label for promise value', (t) => {
  t.is(typeOf(values.promiseValue), labels.objectType)
})
