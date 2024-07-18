import iterate from '@untydev/iterate'
import { isArray, isPlainObject, isUndefined } from '@untydev/types'

import mergeArray from './mergeArray.js'

export default function mergeObject (destination, source) {
  if (!isPlainObject(source)) {
    return destination
  }

  iterate(source, (sourceValue, sourceKey) => {
    const destinationValue = destination[sourceKey]

    if (isPlainObject(destinationValue) && isPlainObject(sourceValue)) {
      destination[sourceKey] = mergeObject(destinationValue, sourceValue)
    } else if (isPlainObject(sourceValue)) {
      destination[sourceKey] = mergeObject({}, sourceValue)
    } else if (isArray(sourceValue)) {
      destination[sourceKey] = mergeArray([], sourceValue)
    } else if (!isUndefined(sourceValue)) {
      destination[sourceKey] = sourceValue
    }
  })

  return destination
}
