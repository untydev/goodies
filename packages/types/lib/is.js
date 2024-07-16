import * as labels from './detail/labels.js'

/* eslint-disable valid-typeof */

export function isUndefined (v) {
  return v === undefined
}

export function isDefined (v) {
  return v !== undefined
}

export function isNull (v) {
  return v === null
}

export function isBoolean (v) {
  return typeof v === labels.booleanType
}

export function isInteger (v) {
  return Number.isSafeInteger(v)
}

export function isNumber (v) {
  return typeof v === labels.numberType && isFinite(v)
}

export function isBigInt (v) {
  return typeof v === labels.bigIntType
}

export function isString (v) {
  return typeof v === labels.stringType
}

export function isArray (v) {
  return Array.isArray(v)
}

export function isFunction (v) {
  return typeof v === labels.functionType
}

export function isObject (v) {
  return v !== null && (typeof v === labels.objectType || v === labels.functionType)
}

export function isIterable (v) {
  return v != null && typeof v[Symbol.iterator] === labels.functionType
}

export function isPromise (v) {
  return v != null && typeof v.then === labels.functionType
}

export function isSymbol (v) {
  return typeof v === labels.symbolType
}
