// @ts-check

// Reference:
// - https://github.com/sindresorhus/ow
// - https://reactjs.org/docs/typechecking-with-proptypes.html

const typeFrom = require('type-from')

function inObject(obj, val) {
  return  Object.keys(obj).map(key => obj[key]).indexOf(val) !== -1
}

function argType(arg, typeCheck) {
  if (inObject(argType.types, typeCheck)) {
    typeCheck(arg)
  } else {
    if (!typeCheck(arg)) {
      throw new TypeError(`Expected \`${arg}\` to pass custom type validation.`)
    }
  }
}

argType.types = {
  array: (arg) => {
    if (typeFrom(arg) !== 'array') throw new TypeError(`Expected \`${arg}\` to be an array`)
  },
  bool: (arg) => {
    if (typeFrom(arg) !== 'boolean') throw new TypeError(`Expected \`${arg}\` to be a boolean`)
  },
  func: (arg) => {
    if (typeFrom(arg) !== 'function') throw new TypeError(`Expected \`${arg}\` to be a function`)
  },
  number: (arg) => {
    if (typeFrom(arg) !== 'number') throw new TypeError(`Expected \`${arg}\` to be a number`)
  },
  object: (arg) => {
    if (typeFrom(arg) !== 'object') throw new TypeError(`Expected \`${arg}\` to be a object`)
  },
  string: (arg) => {
    if (typeFrom(arg) !== 'string') throw new TypeError(`Expected \`${arg}\` to be a string`)
  },
  symbol: (arg) => {
    if (typeFrom(arg) !== 'symbol') throw new TypeError(`Expected \`${arg}\` to be a symbol`)
  },
  instanceOf: (constructor) => {
    return (arg) => {
      if (!(arg instanceof constructor)) throw new TypeError(`Expected \`${arg}\` to be a instance of ${constructor}`)
      return true
    }
  },
  oneOf: (enumerated) => {
    return (arg) => {
      const isValid = enumerated.some(val => val === arg)

      if (!isValid) {
        throw new TypeError(`Expected \`${arg}\` to be one of ${enumerated}`)
      }
      return true
    }
  }
}

module.exports = argType
