# `@untydev/pretty`

Convert numeric values to human-readable strings.

## Installation

Requires Node.js in version `>=17.9.1`

```shell
npm i @untydev/pretty
```

## Usage

```js
import { prettyMilliseconds } from '@untydev/pretty'

console.log(prettyMilliseconds(1000 * 100 + 500))
// => 1m 40.5s
```

## API

### `prettyNanoseconds(value: (number|bigint)): string`

Formats a time duration expressed in nanoseconds into a string.

```js
import { prettyNanoseconds } from '@untydev/pretty'

console.log(prettyNanoseconds(31))
// => 31ns

console.log(prettyNanoseconds(437))
// => 0.4μs

console.log(prettyNanoseconds(3793))
// => 3.8μs
```

### `prettyMicroseconds(value: (number|bigint)): string`

Formats a time duration expressed in microseconds into a string.

```js
import { prettyMicroseconds } from '@untydev/pretty'

console.log(prettyMicroseconds(63))
// => 63μs

console.log(prettyMicroseconds(411))
// => 411μs

console.log(prettyMicroseconds(7892))
// => 7.9ms
```

### `prettyMilliseconds(value: (number|bigint)): string`

Formats a time duration expressed in milliseconds into a string.

```js
import { prettyMilliseconds } from '@untydev/pretty'

console.log(prettyMilliseconds(54))
// => 54ms

console.log(prettyMilliseconds(379))
// => 379ms

console.log(prettyMilliseconds(6336))
// => 6.3s
```

### `prettySeconds(value: (number|bigint)): string`

Formats a time duration expressed in seconds into a string.

```js
import { prettySeconds } from '@untydev/pretty'

console.log(prettySeconds(14))
// => 14s

console.log(prettySeconds(79))
// => 1m 19s

console.log(prettySeconds(3843))
// => 1g 4m 3s
```

### `prettyHrtime(value: (number|bigint|array)): string`

Formats a time duration obtained from `process.hrtime` or `process.hrtime.bigint` into a string.

```js
import { prettyHrtime } from '@untydev/pretty'

const startTime = process.hrtime.bigint()

// do something

console.log(process.hrtime.bigint() - startTime)
// => guesses best output depending on the value
```
