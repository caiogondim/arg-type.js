// @ts-check

// Reference:
// - https://github.com/sindresorhus/ow
// - https://reactjs.org/docs/typechecking-with-proptypes.html

const typeFrom = require('type-from')

function argType(arg, typeCheck) {
  if (Object.values(types).includes(typeCheck)) {
    typeCheck(arg)
  } else {
    if (!typeCheck(arg)) {
      throw new TypeError(`Expected \`${arg}\` to pass custom type validation.`)
    }
  }
}

const types = {
  string: (arg) => {
    if (typeFrom(arg) !== 'string') throw new TypeError(`Expected \`${arg}\` to be a string`)
  },
  array: (arg) => {
    if (typeFrom(arg) !== 'array') throw new TypeError(`Expected \`${arg}\` to be an array`)
  }
}

function foo(a, b, c) {
  try {
    argType(a, types.string)
    argType(b, types.array)
    argType(c, arg => arg === 3)
  } catch (error) {
    console.warn(error)
  }
}

foo('1', [2], 4)
