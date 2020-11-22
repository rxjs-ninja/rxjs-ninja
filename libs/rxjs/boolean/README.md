# RxJS Ninja - Booleans

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-boolean](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-boolean?label=@rxjs-ninja/rxjs-boolean)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-boolean)

[Website](https://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/boolean.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/boolean/CHANGELOG.md)

`@rxjs-ninja/rxjs-boolean` provides operators for querying, filtering and modifying boolean values, and Observable for generating boolean emitters.

For example, you can use the `firstTruthy` or `lastTruthy` value from an array:

```ts
import { from } from 'rxjs';
import { firstTruthy, lastTruthy } from '@rxjs-ninja/rxjs-array';

const inputObs$ = from(['', '', 'Hello', 'There', 'RxJS', 'Ninja', '', '']);

inputObs$.pipe(firstTruthy()).subscribe(); // ['Hello']
inputObs$.pipe(lastTruthy()).subscribe(); // ['Ninja']
```
