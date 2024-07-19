import { isUndefined } from '@untydev/types'

export default function combine (resultArray, higherValue, higherUnit, lowerValue, lowerUnit) {
  if (isUndefined(lowerValue)) {
    if (higherValue > 0n) {
      resultArray.push(`${higherValue}${higherUnit}`)
    }
    return
  }

  if (lowerValue < 1e2 && higherValue === 0n) {
    if (lowerValue > 0n || resultArray.length === 0) {
      resultArray.push(`${lowerValue}${lowerUnit}`)
    }
  } else {
    const rounded = Math.round(Number(lowerValue) / 100)
    if (rounded > 9) {
      resultArray.push(`${higherValue + 1n}${higherUnit}`)
    } else if (rounded > 0) {
      resultArray.push(`${higherValue}.${Math.round(Number(lowerValue) / 100)}${higherUnit}`)
    } else {
      resultArray.push(`${higherValue}${higherUnit}`)
    }
  }
}
