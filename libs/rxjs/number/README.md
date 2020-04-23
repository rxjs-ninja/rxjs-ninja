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

| Method                                                                                                                                    | Operator         | Example                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)                       | `isFinite`       | `from([Infinity]).pipe(isFinite()).subscribe(// false)`                                                              |
| [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)                     | `isInteger`      | `from([1, 3.14]).pipe(isInteger()).subscribe(// true, false)`                                                        |
| [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)                             | `isNaN`          | `from([1, NaN]).pipe(isInteger()).subscribe(// false, true)`                                                         |
| [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger)             | `isSafeInteger`  | `from([[Math.pow(2, 53), Math.pow(2, 53) - 1]]).pipe(isInteger()).subscribe(// false, true)`                         |
| [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)                   | `parseFloat`     | `from(['12.34']).pipe(parseFloat()).subscribe(// 12.34)`                                                             |
| [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)                       | `parseInt`       | `from(['12.34']).pipe(parseInt()).subscribe(// 12)`                                                                  |
| [Number.prototype.toExponential](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)   | `toExponential`  | `from([1000, 2000, 3000]).pipe(toExponential(2)).subscribe(// ['1.00e+3', '2.00e+3', '3.00e+3'])`                    |
| [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) | `toLocaleString` | `from([1000000]).pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }).subscribe(// '€1,000,000.00')` |
| [Number.prototype.toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)       | `toPrecision`    | `from([123.456, 0.004, 1.23e5]).pipe(toPrecision(4)).subscribe(// ['123.5', '0.004000', '1.230e+5'])`                |
| [Number.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)             | `toString`       | `from([1, 255]).pipe(toString(16)).subscribe(// ['1', 'ff'])`                                                        |
