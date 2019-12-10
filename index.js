// @ts-check

// Reference:
// - https://github.com/sindresorhus/ow
// - https://github.com/facebook/prop-types

const typeFrom = require('type-from')

function argType (arg, typeCheck, msg) {
  const isValid = typeCheck(arg, msg)
  // If your custom validation function doesn't thrown an error, a generic one
  // will be used.
  if (!isValid) {
    throw new TypeError(msg || `Expected \`${arg}\` to pass custom type validation.`)
  }
}

argType.types = {
  array: (arg, msg = `Expected \`${arg}\` to be an array`) => {
    if (typeFrom(arg) !== 'array') throw new TypeError(msg)
    return true
  },
  bool: (arg, msg = `Expected \`${arg}\` to be a boolean`) => {
    if (typeFrom(arg) !== 'boolean') throw new TypeError(msg)
    return true
  },
  func: (arg, msg = `Expected \`${arg}\` to be a function`) => {
    if (typeFrom(arg) !== 'function') throw new TypeError(msg)
    return true
  },
  number: (arg, msg = `Expected \`${arg}\` to be a number`) => {
    if (typeFrom(arg) !== 'number' || Number.isNaN(arg)) throw new TypeError(msg)
    return true
  },
  object: (arg, msg = `Expected \`${arg}\` to be a object`) => {
    if (typeFrom(arg) !== 'object') throw new TypeError(msg)
    return true
  },
  string: (arg, msg = `Expected \`${arg}\` to be a string`) => {
    if (typeFrom(arg) !== 'string') throw new TypeError(msg)
    return true
  },
  symbol: (arg, msg) => {
    if (typeFrom(arg) !== 'symbol') throw new TypeError(msg || `Expected \`${arg}\` to be a symbol`)
    return true
  },
  null: (arg, msg = `Expected \`${arg}\` to be null`) => {
    if (typeFrom(arg) !== 'null') throw new TypeError(msg)
    return true
  },
  instanceOf: (constructor) => {
    // arg type here
    return (arg, msg) => {
      if (!(arg instanceof constructor)) {
        throw new TypeError(msg || `Expected \`${arg}\` to be a instance of ${constructor}`)
      }
      return true
    }
  },
  oneOf: (enumerated) => {
    return (arg, msg) => {
      const isValid = enumerated.some(val => val === arg)

      if (!isValid) {
        throw new TypeError(msg || `Expected \`${arg}\` to be one of ${enumerated}`)
      }
      return true
    }
  },
  oneOfType: (typeChecks) => {
    return (arg, msg) => {
      const isValid = typeChecks.some(typeCheck => {
        try {
          const output = typeCheck(arg)
          return output !== false
        } catch (error) {
          return false
        }
      })

      if (!isValid) {
        throw new TypeError(msg || `Invalid arg \`${arg}\` supplied`)
      }

      return true
    }
  },
  arrayOf: (typeCheck) => {
    return (args, msg) => {
      const isValid = args.every(arg => {
        return typeCheck(arg)
      })

      if (!isValid) {
        throw new TypeError(msg || `Invalid arg \`${args}\` supplied`)
      }

      return true
    }
  },
  exact: (strictShape) => {
    const strictShapeKeys = Object.keys(strictShape)

    return (arg, msg) => {
      const argKeys = Object.keys(arg)

      if (strictShapeKeys.length !== argKeys.length) {
        throw new TypeError(msg || `Invalid exact shape of \`${arg}\``)
      }

      const isValid = strictShapeKeys.every(strictShapeKey => {
        try {
          const typeCheck = strictShape[strictShapeKey]
          const output = typeCheck(arg[strictShapeKey])
          return output !== false
        } catch (error) {
          return false
        }
      })

      if (!isValid) {
        throw new TypeError(msg || `Invalid exact shape of \`${arg}\``)
      }

      return true
    }
  }
}

module.exports = argType
