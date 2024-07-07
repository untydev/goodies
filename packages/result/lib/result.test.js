import test from 'ava'
import Result from './result.js'

test('constructor throws if argument is not a function', (t) => {
  t.throws(() => Result(null), { instanceOf: TypeError })
})

test('contains value if function does not throw', (t) => {
  const result = Result(() => '')
  t.true(result.hasValue)
  t.false(result.hasError)
  t.is(result.value, '')
})

test('contains value if function returns Result that contains value', (t) => {
  const result = Result(() => Result(() => ''))
  t.true(result.hasValue)
  t.false(result.hasError)
  t.is(result.value, '')
})

test('contains error if function returns Result that contains error', (t) => {
  const result = Result(() => Result(() => { throw new Error('') }))
  t.false(result.hasValue)
  t.true(result.hasError)
  t.deepEqual(result.error, new Error(''))
})

test('contains value if function throws Result that contains value', (t) => {
  const result = Result(() => { throw Result(() => '') })
  t.true(result.hasValue)
  t.false(result.hasError)
  t.is(result.value, '')
})

test('contains error if function throws Result that contains error', (t) => {
  const result = Result(() => { throw Result(() => { throw new Error('') }) })
  t.false(result.hasValue)
  t.true(result.hasError)
  t.deepEqual(result.error, new Error(''))
})

test('value() throws if result contains error', (t) => {
  const result = Result(() => { throw new Error('') })
  t.throws(() => result.value, { instanceOf: Error, message: '' })
})

test('value() does not throw if result contains value', (t) => {
  const result = Result(() => '')
  t.notThrows(() => result.value)
})

test('value() returns the contained value', (t) => {
  const result = Result(() => '')
  t.is(result.value, '')
})

test('valueOr() returns the contained value', (t) => {
  const result = Result(() => '')
  t.is(result.value, '')
})

test('valueOr() returns a fallback value if result contains error', (t) => {
  const result = Result(() => { throw new Error('') })
  t.is(result.valueOr('fallback'), 'fallback')
})

test('error() throws if result does not contain error', (t) => {
  const result = Result(() => '')
  t.throws(() => result.error, { instanceOf: Error, message: 'Bad result access' })
})

test('error() does not throw if result contains error', (t) => {
  const result = Result(() => { throw new Error('') })
  t.notThrows(() => result.error)
})

test('error() returns contained error', (t) => {
  const result = Result(() => { throw new Error('') })
  t.deepEqual(result.error, Error(''))
})

test('either() returns contained value', (t) => {
  const result = Result.ok('')
  const value = result.either
  t.is(value, '')
})

test('either() returns contained error', (t) => {
  const result = Result.fail(Error(''))
  const error = result.either
  t.deepEqual(error, Error(''))
})

test('result instance can be destructured', (t) => {
  const [value1, error1] = Result.ok('value')
  t.is(value1, 'value')
  t.is(error1)

  const [value2, error2] = Result.fail('error')
  t.is(value2)
  t.is(error2, 'error')
})

test('promise() resolves with result containing value', async (t) => {
  const result = await Result.promise(Promise.resolve('value'))
  t.true(result.hasValue)
  t.false(result.hasError)
})

test('promise() resolves with result containing error', async (t) => {
  const result = await Result.promise(Promise.reject(Error('error')))
  t.true(result.hasError)
  t.false(result.hasValue)
})

test('wrap() returns a function that returns a Result instance', (t) => {
  const func = Result.wrap((a, b) => a * b)
  const result = func(2, 2)
  t.is(result.value, 4)
})
