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

- Filter - Operators for filtering Observable number sources for truthy queries
- Formatting - Operators for formatting numbers to strings
- Math - Operators for some math operations such as add, subtract, multiply and raise by power
- Parsing - Operators for parsing strings to numbers
- Query - Operators for generating number sources and getting boolean values

For example, you can use the `fromNumber` to generate a sequence of numbers and filter out ones that are out of range.

```ts
import { fromNumber, filterInRange, fitlerOutOfRange } from '@rxjs-ninja/rxjs-number';

const inputObs$ = fromNumber([10, 4, 3, 6, 12, 2, 1, 5]);

inputObs$.pipe(filterInRange(4, 10)).subscribe(); // 10, 4, 6, 5
inputObs$.pipe(filterOutOfRange(4, 10)).subscribe(); // 3, 12, 2, 1
```
