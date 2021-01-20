# RxJS Ninja - Utilities

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-utility](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-utility?label=@rxjs-ninja/rxjs-utility)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-utility)

[Website](https://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/utility.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/utility/CHANGELOG.md)

`@rxjs-ninja/rxjs-utility` provides operators for working with Observable values to view them, and modify them and don't
all into the other module categories.

## Function and Operator categories

### HTTP

Functions for working with HTTP Observables -
see [Fetch With Progress Demo](https://stackblitz.com/edit/fetch-with-progress).

### Mapping

Operators use for mapping to different values

```ts
const source$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

// Generate a FizzBuzz from the source numbers
source$.pipe(
  mapIfSource<number, string, number>(
    (value) => value % 15 == 0 || value % 3 == 0 || value % 5 == 0,
    (value) => (value % 15 == 0 ? `FizzBuzz` : value % 3 === 0 ? 'Fizz' : 'Buzz'),
    (value) => value,
  ),
);
// Output: `1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'Fizz' 'Buzz'`
```

### Side Effects

Operators for handling side effects on different events or conditions

```ts
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

### Streams

Operators and Functions for working with other types of streams of data. See Demos:

- [Readable Stream](https://stackblitz.com/edit/rxjs-readable-stream)
- [Readable Stream with Fetch](https://stackblitz.com/edit/rxjs-readable-stream-fetch)
- [Writable Stream](https://stackblitz.com/edit/rxjs-writable-stream)
