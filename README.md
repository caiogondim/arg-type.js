# arg-type
> Like prop-types, but for vanilla JavaScript

## Installation

```bash
npm i -S @caiogondim/arg-type
```

## Usage

Example:
```js
import argType, { types } from '@caiogondim/arg-type'

function sum(a, b) {
  argType(a, types.number)
  argType(b, types.number)

  return a + b
}

sum(1, '2') // => throws TypeError because '2' is not a Number
```

## Types

- `types.array`
- `types.bool`
- `types.func`
- `types.number`
- `types.object`
- `types.string`
- `types.symbol`
- `types.instanceOf`
- `types.oneOf`
- `types.oneOfType`
- `types.arrayOf`
- `types.exact`

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
