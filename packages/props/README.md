# `@untydev/props`

Access nested object properties using paths.

## Installation

```shell
npm i @untydev/props
```

## Usage

```js
// Import the module.
import props from '@untydev/props'

// Define an object with some properties.
const obj = { a: { b: 'x' } }

// Check if the property at the specified path is defined.
props.has(obj, 'a.b')

// Get the property at the specified path.
props.get(obj, 'a.b')

// Set the property at the specified path.
props.set(obj, 'a.b', 'y')
```

## API

### `has(obj, path)`

Checks if the property at the given `path` is defined in the `obj`.

```js
// Object with properties.
const obj = { a: { b: 'x', c: [{ d: 'y' }] } }

// Named properties.
props.has(obj, 'a') // returns true
props.has(obj, 'a.b') // returns true
props.has(obj, 'a.b.x') // returns false; 'x' is not defined

// Array elements.
props.has(obj, 'a.b.c.0') // returns true
props.has(obj, 'a.b.c.0.d') // returns true
props.has(obj, 'a.b.c.1') // returns false; '1' is out of bounds
props.has(obj, 'a.b.c.1.d') // returns false; '1' is out of bounds

// Invalid paths.
props.has(obj) // throws TypeError
props.has(obj, null) // throws TypeError
```

### `get(obj, path, fallback)`

Gets a property of the `obj` at the given `path`, or returns the `fallback` value if the property is not defined.

```js
// Object with properties.
const obj = { a: { b: 'x', c: [{ d: 'y' }] } }

// Named properties.
props.get(obj, 'a.b') // returns 'x'
props.get(obj, 'a.x') // throws; 'x' is not defined
props.get(obj, 'a.x', 'z') // returns 'z'; 'x' is not defined

// Array elements.
props.get(obj, 'a.c.0.d') // returns 'y'
props.get(obj, 'a.c.1.d') // throws; '1' is out of bounds
props.get(obj, 'a.c.1.d', 'z') // returns 'z'; '1' is out of bounds

// Invalid paths.
props.get(obj) // throws TypeError
props.get(obj, null) // throws TypeError
```

### `set(obj, path, value)`

Sets a property at the given path.

```js
// Object with properties.
const obj = { a: { b: 'x', c: [{ d: 'y' }] } }

// Named properties.
props.set(obj, 'a.b', 'z') // modifies 'a.b' to 'z'
props.set(obj, 'a.d.f', 'x') // adds 'd.f' properties to obj

// Array elements.
props.set(obj, 'a.c.0', 'x') // modifies 'a.c.0' to 'x'
props.set(obj, 'a.c.1', 'y') // adds 'y' to the array
props.set(obj, 'a.c.3', 'w') // adds 'w' to the array; 'a.c.2' will be undefined

// Invalid paths.
props.set(obj) // throws TypeError; path is not provided
props.set(obj, null) // thorws TypeError; path is not valid 
```

### `join(...segments)`

Joins multiple path segments into a single path.

```js
// Single segment.
props.join('x') // returns 'x'
props.join(0) // returns '0'
props.join('x.y.z') // returns 'x.y.z'

// Multiple segments.
props.join('x', 'y', 'z') // Returns 'x.y.z'
props.join('x', 0, 'z') // Returns 'x.0.z'
props.join('x.y', 'z') // Returns 'x.y.z'

// Invalid segments.
props.join('x', 'y', null) // throws TypeError; null is not a valid path segment
props.join('x', 7.5, 'z') // throws; '7.5' is not a valid path segment
```

### `split(path)`

Splits the given path into individual segments.

```js
// Without separators.
props.split('x') // returns ['x']

// With seprators.
props.split('x.y.z') // returns ['x', 'y', 'z']
props.split('x.0.z') // returns ['x', '0', 'z']

// Invalid paths.
props.split() // throws TypeError; undefined cannot be split
props.split(null) // throws TypeError; null cannot be split
```
