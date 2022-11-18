# RxJS Ninja - Strings

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-string](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-string?label=@rxjs-ninja/rxjs-string)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-string)

[Website](https://rxjs-ninja.tane.dev)
|
[API Documentation](https://rxjs-ninja.tane.dev/modules/string.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/string/CHANGELOG.md)

`@rxjs-ninja/rxjs-string` provides operators for querying, filtering and modifying string values, and Observable for
generating string emitters.

## Function and Operator categories

### Convert

Convert between String and Array values

```ts
// Split comma-seperated list into tab seperated list
of('Jane,Rod,Freddy,George').pipe(split(','), join('\t')).subscribe();
// Output: `'Jane\tRod\tFreddy\tGeorge'`
```

### Create

Functions to create strings from various input

```ts
// Create a string from an array of codepoints
fromCodePoint([9731, 9733, 9842]).subscribe();
// Output: `'☃★♲'`
```

### Filter

Operators for filtering string based on passed conditions

```ts
const source$ = from(['RxJS', 'TypeScript', 'Angular', 'HorseJS', 'JS Weekly']);

// Get items from the source that only end in `JS`
source$.pipe(filterStartsWith('JS')).subscribe();
// Output: `'JS Weekly'`

// Get items from the source that only end in `JS`
source$.pipe(filterEndsWith('JS')).subscribe();
// Output: `'RxJS', 'HorseJS'`
```

### Mapping

Operators for mapping codes to String values

```ts
// Get the string character for a code point
from([9731, 9733, 9842]).pipe(mapCodePoint()).subscribe();
// Output: `'☃', '★', '♲'`
```

### Modify

Operators for modifying String values

```ts
const source$ = from(['RxJS', 'Angular', 'TypeScript', 'jQuery']);

// Concat to an string
source$.pipe(concat(' is cool')).subscribe();
// Output: `'RxJS is cool', 'Angular is cool', 'TypeScript is cool', 'jQuery is cool'`

source$.pipe(reverse()).subscribe();
// Output: `'SJxR', 'ralugnA', 'tpircSepyT`, 'yreuQj'`
```

### Query

Operators for querying String values and returning a value based on a boolean check

- Query - Operators that return non-string values based on querying string values

```ts
const source$ = from(['RxJS', 'TypeScript', 'Angular', 'HorseJS', 'JS Weekly']);

// Check the string starts with `JS`
source$.pipe(startWith('JS')).subscribe();
// Output: `false, false, false, false, true`

// Check the string ends with `JS`
source$.pipe(endsWith('JS')).subscribe();
// Output: `true, false, false, true, false`
```
