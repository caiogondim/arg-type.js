// @ts-check

// Reference:
// - https://github.com/sindresorhus/ow
// - https://reactjs.org/docs/typechecking-with-proptypes.html

const typeFrom = require('type-from')

function inObject(obj, val) {
  return  Object.keys(obj).map(key => obj[key]).indexOf(val) !== -1
}

function argType(arg, typeCheck) {
  const isValid = typeCheck(arg)
  // If your custom validation function doesn't thrown an error, a generic one
  // will be used.
  if (!isValid) {
    throw new TypeError(`Expected \`${arg}\` to pass custom type validation.`)
  }
}

argType.types = {
  array: (arg) => {
    if (typeFrom(arg) !== 'array') throw new TypeError(`Expected \`${arg}\` to be an array`)
      return true
  },
  bool: (arg) => {
    if (typeFrom(arg) !== 'boolean') throw new TypeError(`Expected \`${arg}\` to be a boolean`)
    return true
  },
  func: (arg) => {
    if (typeFrom(arg) !== 'function') throw new TypeError(`Expected \`${arg}\` to be a function`)
    return true
  },
  number: (arg) => {
    if (typeFrom(arg) !== 'number') throw new TypeError(`Expected \`${arg}\` to be a number`)
    return true
  },
  object: (arg) => {
    if (typeFrom(arg) !== 'object') throw new TypeError(`Expected \`${arg}\` to be a object`)
    return true
  },
  string: (arg) => {
    if (typeFrom(arg) !== 'string') throw new TypeError(`Expected \`${arg}\` to be a string`)
    return true
  },
  symbol: (arg) => {
    if (typeFrom(arg) !== 'symbol') throw new TypeError(`Expected \`${arg}\` to be a symbol`)
    return true
  },
  instanceOf: (constructor) => {
    // arg type here
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
  },
  oneOfType: (typeChecks) => {
    return (arg) => {
      const isValid = typeChecks.some(typeCheck => {
        try {
          const output = typeCheck(arg)
          return output === false ? false : true
        } catch (error) {
          return false
        }
      })

      if (!isValid) {
        throw new TypeError(`Invalid arg \`${arg}\` supplied`)
      }

      return true
    }
  }
}

module.exports = argType
