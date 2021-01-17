## RxJS Ninja

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

RxJS Ninja is a set of libraries that provide operators and observables for [RxJS](https://rxjs.dev).

There are **121** functions provided as operators or Observable generators, split down into separate modules for each
domain.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rxjs-ninja_rxjs-ninja&metric=alert_status)](https://sonarcloud.io/dashboard?id=rxjs-ninja_rxjs-ninja)
[![codecov](https://codecov.io/gh/rxjs-ninja/rxjs-ninja/branch/main/graph/badge.svg?token=RCNN1XMSN4)](https://codecov.io/gh/rxjs-ninja/rxjs-ninja)

### Packages

RxJS Ninja is composed of libraries separated into sets of functionality, you don't need to install all the operators at
one time.

Below is each package npm name and version, once installed you can import any operator or observable into your project.
You can also check out the source on [GitHub](https://github.com/rxjs-ninja/rxjs-ninja).

#### Arrays

[![rxjs-array](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-array?label=@rxjs-ninja/rxjs-array)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-array)

[API Documentation](https://rxjs.ninja/modules/array.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/array/CHANGELOG.md)

`@rxjs-ninja/rxjs-array` provides operators for RxJS for creating Observables of Array values, and for querying,
filtering and modifying [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
and [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) with all results
returned as Arrays where the operator provides them.

### Function and Operator categories

- Create - Functions that create Observable arrays from `Set`, `Map` and `Object` items
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

#### Booleans

[![rxjs-boolean](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-boolean?label=@rxjs-ninja/rxjs-boolean)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-boolean)

[API Documentation](https://rxjs.ninja/modules/boolean.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/boolean/CHANGELOG.md)

`@rxjs-ninja/rxjs-boolean` provides operators for querying, filtering and modifying boolean values, and Observable for
generating boolean emitters.

### Function and Operator categories

- Create - Functions and Operators for creating Observable boolean values
- Filter - Operators for filtering Observable sources for truthy values
- Modify - Operators for modifying boolean values
- Validation - Operators that provide boolean output based on checks against source values

For example, you can use the `firstTruthy` or `lastTruthy` value from an array:

```ts
import { from } from 'rxjs';
import { firstTruthy, lastTruthy } from '@rxjs-ninja/rxjs-array';

const inputObs$ = from(['', '', 'Hello', 'There', 'RxJS', 'Ninja', '', '']);

inputObs$.pipe(firstTruthy()).subscribe(); // ['Hello']
inputObs$.pipe(lastTruthy()).subscribe(); // ['Ninja']
```

#### Numbers

[![rxjs-number](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-number?label=@rxjs-ninja/rxjs-number)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-number)

[API Documentation](https://rxjs.ninja/modules/number.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/number/CHANGELOG.md)

`@rxjs-ninja/rxjs-number` provides operators for querying, filtering and modifying number values, and Observable for
generating number emitters.

### Function and Operator categories

- Create - Functions and Operators for creating Observable number values
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

#### Randomness

[![rxjs-random](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-random?label=@rxjs-ninja/rxjs-random)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-random)

[API Documentation](https://rxjs.ninja/modules/random.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/random/CHANGELOG.md)

`@rxjs-ninja/rxjs-random` Observable for generating random emitters with both numbers and strings.

### Function and Operator categories

- Random Numbers - Generates random number streams
- Random Strings - Generates random string streams

For example, you can use the `fromRandomCrypto` to generate a sequence of random number between `-127` and `127`, then
use `inRange` from `@rxjs-ninja/rxjs-number` and `flip` from `@rxjs-ninja/rxjs-boolean`.

```ts
import { fromRandomCrypto } from '@rxjs-ninja/rxjs-random';
import { inRange } from '@rxjs-ninja/rxjs-number';
import { flip } from '@rxjs-ninja/rxjs-boolean';

/**
 * In this example the random crypto might create
 * values like:
 * 12, -114, -89, 1, 18, -90, 56....
 */
fromRandomCrypto(0, { bytes: 1, unsigned: true })
  .pipe(
    /**
     * Here we check they are in range and return `true` or `false`
     * instead of the value (use `filterInRange` to do this)
     * In this example we get:
     * ...true, false, false, true, true, false, true....
     */
    inRange(-64, 64),
    // Flip each value
    flip(),
  )
  .subscribe(); // ...false, true, true, false, false, true, false...
```

#### Strings

[![rxjs-string](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-string?label=@rxjs-ninja/rxjs-string)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-string)

[API Documentation](https://rxjs.ninja/modules/string.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/string/CHANGELOG.md)

`@rxjs-ninja/rxjs-string` provides operators for querying, filtering and modifying string values, and Observable for
generating string emitters.

### Function and Operator categories

- Create - Functions and Operators for creating Observable string values
- Convert - Operators to convert strings to other types
- Filter - Operators for filtering Observable string sources for truthy values
- Mapping - Operators that provide mapping to strings from other value types
- Modify - Operators for modifying string values
- Query - Operators that return non-string values based on querying string values

For example, you can use the `fromString` to generate a sequence of strings and check they include a string
using `include`. We can also `titlize` strings.

```ts
import { fromString, includes, titleize } from '@rxjs-ninja/rxjs-string';

const inputObs$ = fromNumber(['full power', 'half power', 'quarter power']);

inputObs$.pipe(includes('half')).subscribe(); // false, true, false
inputObs$.pipe(titleize()).subscribe(); // Full Power, Half Power, Quarter Power
```

#### Utilities

[![rxjs-utility](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-utility?label=@rxjs-ninja/rxjs-utility)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-utility)

- [API Documentation](https://rxjs.ninja/modules/string.html)
- [Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/string/CHANGELOG.md)

`@rxjs-ninja/rxjs-utility` provides operators for working with Observable values to view them, and modify them and don't
all into the other module categories.

Most operators fall into the `tap*` category:

```ts
import { fromEvent } from 'rxjs';
import { startWithTap, tapIf, tapOnSubscribe } from '@rxjs-ninja/rxjs-utility';

const inputObs$ = fromEvent(document, 'click').pipe(
  startWithTap(() => console.log('This will only fire once')),
  tapOnSubscribe(() => console.log('This will tab on every subscribe')),
  tapIf(
    (event) => event.target.id === 'some-div',
    () => console.log('This will tap if the user clicks on the target element'),
  ),
);

inputObs$.subscribe(); // This will only fire once, This will tab on every subscribe
inputObs$.subscribe(); // This will tab on every subscribe
```

#### Additional Information

- Logo created by [DesignEvo logo maker](https://www.designevo.com/logo-maker/)
