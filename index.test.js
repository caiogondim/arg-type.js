// @ts-check

/* global test, expect */

const argType = require('./')
const { types } = require('./')

test('array', () => {
  function foo (a) {
    argType(a, types.array)
  }

  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo([1, 2])).not.toThrow(TypeError)
})

test('boolean', () => {
  function foo (a) {
    argType(a, types.bool)
  }

  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo('1')).toThrow(TypeError)
  expect(() => foo(true)).not.toThrow(TypeError)
})

test('number', () => {
  function foo (a) {
    argType(a, types.number)
  }

  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo(1)).not.toThrow(TypeError)
  expect(() => foo([1, 2])).toThrow(TypeError)
})

test('object', () => {
  function foo (a) {
    argType(a, types.object)
  }

  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo([1, 2])).toThrow(TypeError)
  expect(() => foo({})).not.toThrow(TypeError)
})

test('object', () => {
  function foo (a) {
    argType(a, types.symbol)
  }

  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo([1, 2])).toThrow(TypeError)
  expect(() => foo({})).toThrow(TypeError)
  expect(() => foo(Symbol('lorem'))).not.toThrow(TypeError)
})

test('instanceOf', () => {
  class Bar {}
  const bar = new Bar()
  function foo (a) {
    argType(a, types.instanceOf(Bar))
  }

  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo([1, 2])).toThrow(TypeError)
  expect(() => foo({})).toThrow(TypeError)
  expect(() => foo(bar)).not.toThrow(TypeError)
})

test('oneOf', () => {
  function foo (a) {
    argType(a, types.oneOf([1, 2, 3]))
  }

  expect(() => foo(1)).not.toThrow(TypeError)
  expect(() => foo(2)).not.toThrow(TypeError)
  expect(() => foo(3)).not.toThrow(TypeError)
  expect(() => foo(4)).toThrow(TypeError)
})

test('oneOfType', () => {
  function isFunction (arg) {
    return typeof arg === 'function'
  }

  function foo (a) {
    argType(a, types.oneOfType([
      types.number,
      types.string,
      isFunction
    ]))
  }

  expect(() => foo(1)).not.toThrow(TypeError)
  expect(() => foo('abc')).not.toThrow(TypeError)
  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo([1, 2])).toThrow(TypeError)
  expect(() => foo(() => {})).not.toThrow(TypeError)
})

test('arrayOf', () => {
  function foo (a) {
    argType(a, types.arrayOf(types.number))
  }

  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo('abc')).toThrow(TypeError)
  expect(() => foo(true)).toThrow(TypeError)
  expect(() => foo([1, 2])).not.toThrow(TypeError)
})

test('exact', () => {
  function foo (a) {
    argType(a, types.exact({
      b: types.number,
      c: types.bool
    }))
  }

  expect(() => foo(1)).toThrow(TypeError)
  expect(() => foo(false)).toThrow(TypeError)
  expect(() => foo('abc')).toThrow(TypeError)
  expect(() => foo({ b: 1, c: true, d: 2 })).toThrow(TypeError)
  expect(() => foo({ b: 1, c: true })).not.toThrow(TypeError)
})
