import iterate from '@untydev/iterate'
import { isArray, isPlainObject, isUndefined } from '@untydev/types'

import mergeObject from './mergeObject.js'

export default function mergeArray (destination, source) {
  iterate(source, (sourceValue) => {
    if (isPlainObject(sourceValue)) {
      destination.push(mergeObject({}, sourceValue))
    } else if (isArray(sourceValue)) {
      destination.push(mergeArray([], sourceValue))
    } else if (!isUndefined(sourceValue)) {
      destination.push(sourceValue)
    }
  })

  return destination
}
