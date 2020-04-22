# RxJS Primitives - Number Operators

This library contains the [RxJS Primitives](https://github.com/tanepiper/rxjs-primitives) for
ECMAScript [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
methods.

## Status

This library is currently in development. Please be aware APIs may change and there are missing features.

## How to install

In your project run `npm install @tinynodes/rxjs-number`

To include in your project you can import the operators to include in any RxJS `pipe`

```ts
import { parseFloat, parseInt } from '@tinynodes/rxjs-number';
import { fromArray } from 'rxjs';

fromArray(['1', '12', '136'])
  .pipe(parseInt(16))
  .subscribe({
    next: value => console.log(value), // 1, A, 5E
  });

fromArray(['1', '1.2', '45.34'])
  .pipe(parseFloat())
  .subscribe({
    next: value => console.log(value), // 1, 1.2, 45.34
  });
```

## Available Methods

| Method                                                                                                                  | Operator     | Example                                                |
| ----------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------ |
| [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat) | `parseFloat` | `from(['12.34']).pipe(parseFloat()).subscribe(// 12.34)` |
| [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)     | `parseInt`   | `from(['12.34']).pipe(parseInt()).subscribe(// 12)`      |
