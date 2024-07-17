# `@untydev/types`

Dynamic type checking utilities for JavaScript.

## Introduction

The `@untydev/types` package provides various functions for checking and ensuring dynamic types of JavaScript values.

## Installation

Using NPM:

```shell
npm i @untydev/types
```

## Usage

```js
import { ensureArray, ensureFunction } from '@untydev/types'

function map (arr, fn) {
  ensureArray(arr)
  ensureFunction(fn)  
  return arr.map(fn)
}
```

## API

### `isNull(v)`

Checks whether `v` is `null`.

```js
import { isNull } from '@untydev/types'

isNull(null) === true
```

### `isUndefined(v)`

Checks whether `v` is `undefined`.

```js
import { isUndefined } from '@untydev/types'

isUndefined() === true
isUndefined(undefined) === true
```

### `isBoolean(v)`

Checks whether `v` is either `true` or `false`.

```js
import { isBoolean } from '@untydev/types'

isBoolean(true) === true
isBoolean(false) === true
```

### `isInteger(v)`

Checks whether `v` is an integer using `Number.isSafeInteger`.

```js
import { isInteger } from '@untydev/types'

isInteger(1) === true
isInteger(0.1) === false
isInteger(NaN) === false
isInteger(Infinity) === false
````

### `isNumber(v)`

Checks whether `v` is a number, excluding infinite values.

```js
import { isNumber } from '@untydev/types'

isNumber(1) === true
isNumber(NaN) === false
isNumber(Infinity) === false
```

### `isBigInt(v)`

Checks whether `v` is a `BigInt`.

```js
import { isBigInt } from '@untydev/types'

isBigInt(1) === false
isBigInt(1n) === true
isBigInt(BigInt(1)) === true
```

### `isString(v)`

Checks whether `v` is a string, excluding `String` object.

```js
import { isString } from '@untydev/types'

isString('') === true
```

### `isArray(v)`

Checks whether `v` is an array using `Array.isArray`.

```js
import { isArray } from '@untydev/types'

isArray([]) === true
```

### `isFunction(v)`

Checks whether `v` is a function.

```js
import { isFunction } from '@untydev/types'

isFunction(() => null) === true
```

### `isObject(v)`

Checks whether `v` is a non-null object or a [function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function).

```js
import { isObject } from '@untydev/types'

isObject({}) === true
isObject([]) === true
isObject(() => null) === true
isObject(null) === false
isObject('') === false
```

### `isPlainObject(v)`

Checks whether `v` is an object a plain object which is an object created by the `Object` constructor or one with a
`[[Prototype]] of null. 

```js
import { isPlainObject } from '@untydev/types'

isPlainObject({}) === true
isPlainObject(Object.create(null)) === true
isPlainObject(null) === false

class X {}
isPlainObject(new X()) === false
```

### `isSymbol(v)`

Checks whether `v` is a `Symbol`.

```js
import { isSymbol } from '@untydev/types'

isSymbol(Symbol('test')) === true
```

### `isIterable(v)`

Checks whether `v` is iterable, e.g. implements the [iterable protocol](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)

```js
import { isIterable } from '@untydev/types'

isIterable('') === true
isIterable([]) === true
isIterable({}) === false
```

### `isPromise(v)`

Checks whether `v` is promise-like, e.g. implements `then` method.

```js
import { isPromise } from '@untydev/types'

isPromise(Promise.resolve()) === true
isPromise({ then: () => null }) === true
```

### `ensure*(v)`

Additionally, every `is*` function has a `ensure*` counterpart, which throw `TypeError` exceptions if `v` is not a correct type.

```js
import { ensureIterable } from '@untydev/types'

ensureIterable(null) // throws TypeError('Expected iterable but got null')
```

### `typeOf(v)`

Similarly to `typeof` operator, returns the type of `v`. It handles several special cases:

```js
import { typeOf } from '@untydev/types'

typeOf(null) === 'null'
typeOf(NaN) === 'NaN'
typeOf(Infinity) === 'infinity'
```
