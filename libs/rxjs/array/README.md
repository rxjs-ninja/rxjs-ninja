# RxJS Ninja - Arrays

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-array](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-array?label=@rxjs-ninja/rxjs-array)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-array)

[Website](https://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/array.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/array/CHANGELOG.md)

`@rxjs-ninja/rxjs-array` provides operators for RxJS for creating Observables of Array values, and for querying,
filtering and modifying [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
and
[Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) with all results returned
as Arrays where the operator provides them.

### Function and Operator categories

- Convert - Functions that convert source Observable `Set`, `Map` and `Object` to `Array`
- Filter - Operators that return source Arrays, or items from arrays using filtering functions or properties
- Modify - Operators that modify Arrays or their values
- Query - Operators that return non-Array values based on querying an arrays values
- Set - Operators for working with `Set` objects (currently only `toSet` but more operators to come!)

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
