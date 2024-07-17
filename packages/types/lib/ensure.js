import * as is from './is.js'
import * as labels from './detail/labels.js'
import { typeOf } from './typeof.js'
import { isPlainObject } from './is.js'

function failWith (e) {
  throw e
}

function ensureType (v, f, l) {
  return f(v) ? v : failWith(new TypeError(`Expected ${l} but got ${typeOf(v)}`))
}

export function ensureUndefined (v) {
  return ensureType(v, is.isUndefined, labels.undefinedType)
}

export function ensureDefined (v) {
  return ensureType(v, is.isDefined, labels.definedType)
}

export function ensureNull (v) {
  return ensureType(v, is.isNull, labels.nullType)
}

export function ensureBoolean (v) {
  return ensureType(v, is.isBoolean, labels.booleanType)
}

export function ensureInteger (v) {
  return ensureType(v, is.isInteger, labels.integerType)
}

export function ensureNumber (v) {
  return ensureType(v, is.isNumber, labels.numberType)
}

export function ensureBigInt (v) {
  return ensureType(v, is.isBigInt, labels.bigIntType)
}

export function ensureString (v) {
  return ensureType(v, is.isString, labels.stringType)
}

export function ensureArray (v) {
  return ensureType(v, is.isArray, labels.arrayType)
}

export function ensureFunction (v) {
  return ensureType(v, is.isFunction, labels.functionType)
}

export function ensureObject (v) {
  return ensureType(v, is.isObject, labels.objectType)
}

export function ensurePlainObject (v) {
  return isPlainObject(v) ? v : failWith(new TypeError('Expected plain object'))
}

export function ensureIterable (v) {
  return ensureType(v, is.isIterable, labels.iterableType)
}

export function ensureSymbol (v) {
  return ensureType(v, is.isSymbol, labels.symbolType)
}

export function ensurePromise (v) {
  return ensureType(v, is.isPromise, labels.promiseType)
}
