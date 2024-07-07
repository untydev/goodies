# `@untydev/iterate`

Iterate over objects, strings and collections using a single function.

## Installation

Requires Node.js version `>=16.15.0`.

Install using NPM:

```shell
npm i @untydev/iterate
```

## Usage

Import `iterate` function using `import` statement:

```js
import iterate from '@untydev/iterate'
```

The `iterate` function accepts a value to iterate over, and a function to call for each element of that value. The
value can be an any iterable value, e.g. array, string, or an object. 

When iterating over iterables, the function receives three arguments. The first one is the current element. The second
one is the index of the element. The third one is the iterable object itself:

```js
// array
iterate([1, 2, 3], (value, index, array) => {})

// string
iterate('abc', (char, index, string) => {})

// set
iterate(new Set('a', 'b', 'c'), (value, index, set) => {})

// integer
iterate(10, (integer) => {})
```

When iterating over objects, the function also receives three arguments. The first one is the value of the current
property. The second one is the key of that property. The third one is the object itself.

```js
iterate({ a: 1, b: 2, c: 3 }, (value, key, object) => {})
```

Although, the built-in `Map` type is technically an iterable, it is treated like an object by the `iterate` function:

```js
iterate(new Map([[1, 'a'], [2, 'b'], [3, 'c']], (value, key, map) => {}))
```

You can use more specific functions if you know your type.

For iterables use `iterateIterable`:

```js
import { iterateIterable } from '@untydev/iterate'

iterateIterable([1, 2, 3], (value, index, array) => {})
```

For objects use `iterateObject`:

```js
import { iterateObject } from '@untydev/iterate'

iterateObject({ a: 1, b: 2, c: 3 }, (value, key, object) => {})
```

For the built-in `Map` use `iterateMap`:

```js
import { iterateMap } from '@untydev/iterate'

iterateMap(new Map([[1, 'a'], [2, 'b'], [3, 'c']], (value, key, map) => {}))
```

You can iterate over negative integer values too:

```js
import { iterateInteger } from '@untydev/iterate'

iterateInteger(-10, (integer) => {})
```
