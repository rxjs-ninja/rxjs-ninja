# RxJS Ninja - Numbers

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-number](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-number?label=@rxjs-ninja/rxjs-number)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-number)

[Website](http://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/number.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/number/CHANGELOG.md)

`@rxjs-ninja/rxjs-number` provides operators for querying, filtering and modifying number values, and Observable for generating number emitters.

For example, you can use the `fromNumber` to generate a sequence of numbers and filter out ones
that are out of range.

```ts
import { fromNumber, filterInRange, fitlerOutOfRange } from '@rxjs-ninja/rxjs-number';

const inputObs$ = fromNumber([10, 4, 3, 6, 12, 2, 1, 5]);

inputObs$.pipe(filterInRange(4, 10)).subscribe(); // 10, 4, 6, 5
inputObs$.pipe(filterOutOfRange(4, 10)).subscribe(); // 3, 12, 2, 1
```
