# `@untydev/options`

## Installation

Requires Node.js in version `>=17.9.1`.

```shell
npm i @untydev/options
```

## Usage

```js
import makeOptions from '@untydev/options'

const defaultOptions = {
  firstOption: true,
  secondOption: 'a'
}

function doSomething (options) {
  options = makeOptions(options, defaultOptions)
  
  console.log(options)
}

doSomething()
// options = { firstOption: true, secondOption: 'a' }

doSomething({ firstOption: false })
// options = { firstOption: false, secondOption: 'a' }

doSomething({ secondOption: 'b' })
// options = { firstOption: true, secondOption: 'b' })
```

## API

### `makeOptions(inputOptions: Object, [defaultOptions: Object]): Object`

Merges `inputOptions` with `defaultOptions` and returns a new object. None of the input arguments is modified. The
merging is done with `@untydev/merge` function.
