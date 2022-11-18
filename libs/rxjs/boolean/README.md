# RxJS Ninja - Booleans

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-boolean](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-boolean?label=@rxjs-ninja/rxjs-boolean)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-boolean)

[Website](https://rxjs-ninja.tane.dev)
|
[API Documentation](https://rxjs-ninja.tane.dev/modules/boolean.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/boolean/CHANGELOG.md)

`@rxjs-ninja/rxjs-boolean` provides operators for querying, filtering and modifying boolean values, and Observable for
generating boolean emitters.

## Function and Operator categories

### Create

Functions and Operators for creating Observable boolean values

```ts
const numbers = [0, 1, 0, 0, 1, 0, 1];
const strings = ['RxJS', '', '', 'Ninja', 'TypeScript'];

// Generate a boolean array from numbers
fromBoolean(numbers).subscribe();
// Output: `false, true, false, false, true, false, true`

// Generate a boolean array from numbers
fromBoolean(strings).subscribe();
// Output: `true, false, false, true, true`
```

### Filter

Operators for filtering Observable sources for truthy values

```ts
const strings$ = from(['RxJS', '', '', 'Ninja', 'TypeScript', '', 'Angular']);

// Get the first truthy value
strings$.pipe(firstTruthy()).subscribe();
// Output: `RxJS`

// Get the first truthy value that is over length of 6
strings$.pipe(firstTruthy((v) => v.length > 5)).subscribe();
// Output: `TypeScript`

// Get the last truthy value
strings$.pipe(lastTruthy()).subscribe();
// Output: `Angular`

// Get the last truthy value of less than 5 characters
strings$.pipe(lastTruthy((v) => v.length < 5)).subscribe();
// Output: `RxJS`
```

### Modify

Operators for modifying boolean values

```ts
const source$ = from([false, true, true, false]);

// Flip the boolean value
source$.pipe(flip()).subscribe();
// Output: `true, false, false, true`
```

### Validation

Operators that provide boolean output based on checks against source values

```ts
const input = ['4485275742308327', '1111222233334444', '111133332224444'];
from(input).pipe(luhnCheck()).subscribe();
// Output: `[true, true, false]`
```
