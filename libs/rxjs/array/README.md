# RxJS Ninja - Arrays

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-array](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-array?label=@rxjs-ninja/rxjs-array)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-array)

[Website](https://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/array.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/array/CHANGELOG.md)

`@rxjs-ninja/rxjs-array` provides operators for querying, filtering and modifying arrays.

For example, you could `sortMap` an array of values from number into boolean and them `flipArray` the values:

```ts
import { of } from 'rxjs';
import { sortMap, flipArray } from '@rxjs-ninja/rxjs-array';

of([10, 4, 7, 3, 1, 29, 5])
  .pipe(
    /**
     * Out of the box `sortMap` does a basic sort on an array so the
     * result will be [1, 3, 4, 5, 7, 10, 29]
     * Then the map function will be called with the result, here we do a modulus 2 check
     * so the result is [false, false, true, false, false, true, false]
     */
    sortMap((value) => value % 2),
    // Now we flip the array
    flipArray(),
  )
  .subscribe(); // [true, true, false, true, true, false, true]
```
