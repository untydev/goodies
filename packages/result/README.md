# `@untydev/result`

Handle function call results using a common type

## Installation

Requires Node.js version `>=16.15.0`.

Install using NPM:

```shell
npm i @untydev/result
```

## Usage

Import `Result` constructor using `import` statement:

```js
import Result from '@untydev/result'
```

The constructor accepts a single function, and an optional list of arguments. The function passed to the `Result`
constructor is called immediately, and the result of that call can be later accessed through properties of the
returned `Result` instance:

```js
const result = Result(() => { /* ... */ })
// access result
```

You can construct `Result` instances with or without `new`, which means that `new Result()` is the same as `Result()`.

### Accessing results

Values are objects returned by functions passed to the `Result` constructor. Exceptions thrown by these functions are
not values, they are errors. If a function returns a value, it is said that `Result` contains a value. Similarly, if a
function throws an error, it is said that `Result` contains an error.

You can check whether a particular `Result` instance contains a value or an error by reading `result.hasValue` and
`result.hasError` properties:

```js
const ok = Result(() => 'foo')
ok.hasValue === true
ok.hasError === false

const nok = Result(() => { throw 'foo' })
nok.hasValue === false
nok.hasError === true
```

You can access the contained value or error by calling `result.value` or `result.error` getters:

```js
const ok = Result(() => 'foo')
ok.value === 'foo'

const nok = Result(() => { throw 'foo' })
nok.error === 'foo'
```

If you try to access value of a result that contains error, that error will be thrown. Similarly, when you try to
access error of a result that contains value, then`Error('Bad result access')` error will be thrown.

You can use the special method `result.valueOr` to get the contained value, or the given fallback value, without
throwing any errors:

```js
const ok = Result(() => 'foo')
ok.valueOr('bar') === 'foo'

const nok = Result(() => { throw 'foo' })
nok.valueOr('bar') === 'bar'
```

Finally, you can unwrap a particular `Result` instance by calling `result.either` getter. It will return whatever is
contained without throwing errors:

```js
const ok = Result(() => 'foo')
ok.either === 'foo'

const nok = Result(() => { throw 'foo' })
nok.either === 'foo'
```

### Returning results

It is possible for functions to return `Result` instances directly. This allows the caller's code to avoid manually
wrapping those functions with the `Result` constructor:

```js
// foo.js
const foo = () => Result(() => { /* ... */ })
export default foo
```

```js
// main.js
import foo from './foo.js'
const result = foo()
// access result
```

Alternatively, you can use `Result.wrap` helper function to create a function that returns `Result` instances:

```js
// foo.js
const foo = Result.wrap(() => { /* ... */ })
export default foo
```

```js
// main.js
import foo from './foo.js'
const result = foo()
// access result
```

There's a few helper functions that ease creation of `Result` instances. You can construct a `Result` instance
containing a value or error using `Result.ok` or `Result.fail` static methods (similar to `Promise.resolve` and
`Promise.reject`):

```js
const ok = Result.ok('foo')
ok.value === 'foo'

const nok = Result.nok('foo')
ok.error === 'foo'
```

### Collapsing results

Functions passed to the `Result` constructor can themselves return `Result` instances. In such scenarios, a chain of
results will collapse into a single result:

```js
const ok = Result(() => Result(() => 'foo'))
ok.value === 'foo'

const nok = Result(() => Result(() => { throw 'foo' }))
nok.error === 'foo'
```

The same happens if a function throws a `Result` instance:

```js
const ok = Result(() => { throw Result(() => 'foo') })
ok.value === 'foo'

const nok = Result(() => { throw Result(() => { throw 'foo' }) })
nok.error === 'foo'
```

Notice that throwing a `Result` instance that contains a value results in the outermost `Result` instance to also
contain a value instead of an error. Throwing `Result` instances is treated the same way as returning `Result` instances.

### Working with promises

You can wrap promises in `Result` instances using `Result.promise` static method:

```js
const ok = await Result.promise(Promise.resolve('foo'))
ok.value === 'foo'

const nok = await Result.promise(Promise.reject('foo'))
nok.error === 'foo'
```

With this approach you can avoid the burden of writing `try...catch` blocks, and replace them with conditionals:

```js
import { readFile } from 'fs/promises'

try {
  const content = await readFile('foo.json', 'utf8')
  // parse json
} catch (error) {
  // handle the error
}
```

```js
import { readFile } from 'fs/promises'

const result = await Result.promise(readFile('foo.txt', 'utf8'))
if (result.hasValue) {
  // parse json
} else {
  // handle the error
}
```
