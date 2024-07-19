# `@untydev/merge`

## Installation

Requires Node.js in version `>=16.15.0`.

```shell
npm i @untydev/merge
```

## Usage

```js
// Import the module.
import merge from '@untydev/merge'

// Define the source object.
const source = { a: true, b: false }

// Define the destination object.
const destination = { b: true, c: false }

// Merge properties of source into destination.
merge(destination, source)
```

## API

### `merge([destination: Object], [source: Object]): Object`

Merges own properties of `source` into `destination`. Source properties that resolve to `undefined` are skipped. Arrays
and plain objects are merged recursively. Destination arrays are replaced by source arrays. Source arrays are cloned
recursively. Other values are copied by assignment.

```
import merge from '@untydev/merge`

merge({ a: true }, { b: false })
// destination = { a: true, b: false }

merge({ a: { b: true } }, { a: { a: true } })
// destination = { a: { a: true, b: true } }

merge({ a: [1, 2] }, { a: [3, 4] })
// destination = { a: [3, 4] }

merge({ a: true }, { a: [1, 2] })
// destination = { a: [1, 2] }

merge({ a: [{ b: [1, 2] }] }, { a: [{ b: [3, 4] }] })
// destination = { a: [{ b: [3, 4] }] }
```

If the `destination` is undefined, an object will be created. If the `destination` is not an object, a `TypeError`
exception will be thrown. `isObject` function from `@untydev/types` package is used to test if destination is an object.

If the `source` is undefined, an object will be created. If the `source` is not a plain object, a `TypeError` exception
will be thrown. `isPlainObject` function from `@untydev/types` package is used to test if source is a plain object.


