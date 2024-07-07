import * as labels from './detail/labels.js'

/* eslint-disable valid-typeof */

export function typeOf (v) {
  if (v === null) {
    return labels.nullType
  }

  if (typeof v !== labels.numberType) {
    return typeof v
  }

  if (isNaN(v)) {
    return labels.NaNType
  }

  if (isFinite(v)) {
    return labels.numberType
  }

  return labels.infinityType
}
