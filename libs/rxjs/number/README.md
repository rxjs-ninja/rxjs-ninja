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

## RxJS Number API

### `isFinite`/`fromIsFinite`

Based on [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) the
two methods provided by this library can be used inside an Observable subscription. The `isFinite` method returns a boolean
value based on the input, while `fromIsFinite` returns the underlying value.

#### Example

```ts
from([1, Infinity])
  .pipe(isFinite())
  .subscribe(console.log) // [true, false]

from([1, Infinity])
  .pipe(fromIsFinite())
  .subscribe(console.log) // [1]
```

### `isInteger`/`fromIsInteger`

Based on [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) the
two methods provided by this library can be used inside an Observable subscription. The `isInteger` method returns a boolean
value based on the input, while `fromIsInteger` returns the underlying value.

### `isSafeInteger`/`fromIsSafeInteger`

Based on [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) the
two methods provided by this library can be used inside an Observable subscription. The `isSafeInteger` method returns a boolean
value based on the input, while `fromIsSafeInteger` returns the underlying value.

### `isNaN`

Based on | [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) this method
returns a boolean value in an Observable number source.

### `parseFloat`

Based on [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat) the method
returns a parsed float value from an Observable string source.

### `parseInt`

Based on [Number.parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt) the method
returns a parsed integer value from an Observable string source.

The method take an optional `radix` value, the default is `10`.

### `toExponential`

Based on [Number.prototype.toExponential](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential) this method
returns a number value to the required `exponential` parameter.

### `toLocaleString`

Based on [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) this method
takes an Observable number value and returns a string formatted based on [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
options.

### `toPrecision`

Based on [Number.prototype.toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) this method
takes an Observable number and returns a string formatted to the passed `precision` value.

### `toString`

Based on [Number.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) this method
takes an Observable number and returns a string value based on the optional `radix` - the default value is `10`.

| Method                                                                                                                                    | Operator         | Example                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
|                        | `isFinite`       | `from([Infinity]).pipe(isFinite()).subscribe(// false)`                                                              |
|                      | `isInteger`      | `from([1, 3.14]).pipe(isInteger()).subscribe(// true, false)`                                                        |
                             | `isNaN`          | `from([1, NaN]).pipe(isInteger()).subscribe(// false, true)`                                                         |
|              | `isSafeInteger`  | `from([[Math.pow(2, 53), Math.pow(2, 53) - 1]]).pipe(isInteger()).subscribe(// false, true)`                         |
|                   | `parseFloat`     | `from(['12.34']).pipe(parseFloat()).subscribe(// 12.34)`                                                             |
|                       | `parseInt`       | `from(['12.34']).pipe(parseInt()).subscribe(// 12)`                                                                  |
|   | `toExponential`  | `from([1000, 2000, 3000]).pipe(toExponential(2)).subscribe(// ['1.00e+3', '2.00e+3', '3.00e+3'])`                    |
| [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) | `toLocaleString` | `from([1000000]).pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' }).subscribe(// '€1,000,000.00')` |
| [Number.prototype.toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)       | `toPrecision`    | `from([123.456, 0.004, 1.23e5]).pipe(toPrecision(4)).subscribe(// ['123.5', '0.004000', '1.230e+5'])`                |
|            | `toString`       | `from([1, 255]).pipe(toString(16)).subscribe(// ['1', 'ff'])`                                                        |
