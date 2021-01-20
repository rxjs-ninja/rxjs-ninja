# RxJS Ninja - Numbers

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-number](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-number?label=@rxjs-ninja/rxjs-number)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-number)

[Website](http://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/number.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/number/CHANGELOG.md)

`@rxjs-ninja/rxjs-number` provides operators for querying, filtering and modifying number values, and Observable for
generating number emitters.

## Function and Operator categories

### Create

Functions and Operators for creating Observable number values

```ts
// Generate a number stream, take `6`, add `1` return the modulus `3` value
fromNumber().pipe(take(6), add(1), mod(3)).subscribe();
// Output: `1, 2, 0, 1, 2, 0`
```

### Filter

Operators for filtering Observable number sources for truthy queries

```ts
const source$ = from([1.4, 5, 8.2, 10, 12, 19, 11, 7.6, 14]);

// Gets numbers only in the range of `2` to `11`
source$.pipe(filterInRange(2, 11)).subscribe();
// Output: `5, 8.2, 10, 12, 11, 7.6`

// Gets numbers only in the range of `2` to `11`
source$.pipe(filterOutOfRange(2, 11)).subscribe();
// Output: `1.4, 19, 14`

// Get only floating numbers
source$.pipe(filterIsFloat()).subscribe();
// Output: `1.4, 8.2, 7.6`
```

### Formatting

Operators for formatting numbers to strings

```ts
const floatSource$ = from([1.9875, 5.67, 8.1, 97.344]);

// Get a fixed length string
floatSource$.pipe(toFixed(2)).subscribe();
// Output: `'1.99', '5.67', '8.10', '97.34'`

// Format value to local currency
floatSource$.pipe(toLocaleString('en-GB', { currency: 'EUR', style: 'currency' })).subscribe();
// Output: `'€1.99', '€5.67', '€8.10', '€97.34'`
```

### Math

Operators for some math operations such as add, subtract, multiply and raise by power

```ts
const source$ = from([1, 2, 3, 4, 5]);

// Add `5` to the source value
$source.pipe(add(5)).subscribe();
// Output: `6, 7, 8, 9, 10`

// Add `5` to the source value
$source.pipe(mul(2)).subscribe();
// Output: `2, 4, 6, 8, 10`

// Return the remainder for modulus 2
$source.pipe(mod(2)).subscribe();
// Output: `1, 0, 1, 0, 1`
```

### Parsing

Operators for parsing strings to numbers

```ts
const floatSource$ = from(['1.9875', '5.67', '8.1', '97.344', 'Ninja']);

// Parse string values as float
floatSource$.pipe(parseFloat()).subscribe()
// Output: `1.9875, 5.67, 8.1, 97.344, NaN`

// Parse string values as integer
floatSource$.pipe(parseInt()).subscribe()
// Output: `1, 5, 8, 97, NaN`
```

### Query

Operators for querying number sources for boolean checks

```ts
const source$ = from([1.4, 5, 8.2, NaN, 12, 19, 11, NaN, 14]);

// Check if number is in range of `2` to `11`
source$.pipe(inRange(2, 11)).subscribe();
// Output: `false, true, true, false, false, false, true, false, false`

// Check if values are not `NaN` values
source.pipe(isNotNaN()).subscribe();
// Output: `true, true, true, false, true, true, true, false, true`
```
