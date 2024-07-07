/**
 * Default separator of path segments.
 * @type {string}
 * @public
 */
export const separator = '.'

/**
 * Check if the given property of the object is available at the given path.
 * @param {Object|Array} obj The object to check.
 * @param {string|number} path The path to the property.
 * @return {boolean} Returns `true` if the property is defined, or `false` otherwise.
 * @throws Throws if the given path is not a string or number, or the object cannot be enumerated.
 * @public
 */
export function has (obj, path) {
  const segments = split(path)
  for (const segment of segments) {
    if (segment in Object(obj)) {
      obj = obj[segment]
    } else {
      return false
    }
  }

  return obj !== undefined
}

/**
 * Get the property of an object at the given path.
 * @param {Object|Array} obj The object whose property is to be retrieved.
 * @param {string|number} path The path to the property to be retrieved.
 * @param {*} fallback A value to return if the property at the specified path is undefined.
 * @return {*} Returns the value of the property at the specified path, or the fallback value if the property is undefined.
 * @throws Throws if the path is not a string or number, the object cannot be enumerated, or the property is not defined and `fallback` was not provided.
 * @public
 */
export function get (obj, path, fallback = undefined) {
  const segments = split(path)
  for (const segment of segments) {
    if (segment in Object(obj)) {
      obj = obj[segment]
    } else {
      obj = undefined
      break
    }
  }

  if (obj !== undefined) {
    return obj
  }

  if (fallback !== undefined) {
    return fallback
  }

  throw Error(`'${path}' object property not found`)
}

/**
 * Set the property of an object at the given path.
 * @param {Object|Array} obj The object to modify.
 * @param {string|number} path The path to the property.
 * @param {*=} value The value of the property.
 * @return {*} Returns the input object.
 * @throws Throws if the given path is not a string or number, or the object cannot be enumerated.
 * @public
 */
export function set (obj, path, value) {
  const root = obj
  const segments = split(path)
  for (let i = 0; i < segments.length; ++i) {
    const currSegment = segments[i]
    const nextSegment = segments[i + 1]
    if (!(currSegment in obj)) {
      obj[currSegment] = isInt(nextSegment) ? [] : {}
    }

    if (i === segments.length - 1) {
      obj[currSegment] = value
    }

    obj = obj[currSegment]
  }

  return root
}

/**
 * Join multiple path segments into a single path.
 * @param {...string|number} segments An array of path segments to join.
 * @return {string} Returns the joined path. The returned path is normalized.
 * @public
 */
export function join (...segments) {
  return segments.reduce((joined, segment) => {
    if (typeof segment === 'string' || Number.isInteger(segment)) {
      return joined + separator + segment
    }
    throw TypeError('path segment is not a string or number')
  }, '').slice(1)
}

/**
 * Split the given path into an array of path segments.
 * @param {string|number} path A path to split.
 * @return {string[]|number[]} An array of path segments.
 * @throws Throws if path is not a string or number.
 * @public
 */
export function split (path) {
  if (isInt(path)) {
    return [path]
  }

  if (isStr(path)) {
    return path.length === 0 ? [] : path.split(separator)
  }

  throw TypeError('path is not a string or number')
}

/**
 * @private
 */
function isInt (val) {
  if (typeof val === 'number') {
    return Number.isInteger(val)
  }

  if (typeof val === 'string') {
    return parseInt(val, 10).toString() === val
  }

  return false
}

/**
 * @private
 */
function isStr (val) {
  return typeof val === 'string'
}

/**
 * @public
 */
export default {
  has, get, set, join, split
}
