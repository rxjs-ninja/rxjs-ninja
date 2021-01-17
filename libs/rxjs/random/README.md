# RxJS Ninja - Randomness

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-random](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-random?label=@rxjs-ninja/rxjs-random)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-random)

[Website](https://rxjs.ninja)
|
[API Documentation](https://rxjs.ninja/modules/random.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/random/CHANGELOG.md)

`@rxjs-ninja/rxjs-random` Observable for generating random emitters with both numbers and strings.

### Function and Operator categories

- Random Numbers - Generates random number streams
- Random Strings - Generates random string streams

For example, you can use the `fromRandomCrypto` to generate a sequence of random number between `-127` and `127`,
then use `inRange` from `@rxjs-ninja/rxjs-number` and `flip` from `@rxjs-ninja/rxjs-boolean`.

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
