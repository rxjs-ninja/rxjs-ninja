# RxJS Ninja - Randomness

![The RXJS Ninja Logo](https://raw.githubusercontent.com/rxjs-ninja/rxjs-ninja/main/assets/logo.png)

[![rxjs-random](https://img.shields.io/npm/v/@rxjs-ninja/rxjs-random?label=@rxjs-ninja/rxjs-random)](https://www.npmjs.com/package/@rxjs-ninja/rxjs-random)

[Website](https://rxjs-ninja.tane.dev)
|
[API Documentation](https://rxjs-ninja.tane.dev/modules/random.html)
|
[Changelog](https://github.com/rxjs-ninja/rxjs-ninja/blob/main/libs/rxjs/random/CHANGELOG.md)

`@rxjs-ninja/rxjs-random` Observable for generating random emitters with both numbers and strings.

## Function and Operator categories

### Random Numbers

Functions to create Observable random numbers

```ts
// Randomly generate 50 `1byte` values between `-127` and `127` and filter values in the range `-64, 64`
fromRandomCrypto(0, { bytes: 1, unsigned: true }).pipe(take(50), filterInRange(-64, 64)).subscribe();
Output: `-12, 4, 64, 32, -1, 21, -43`;
```

### Random Strings

```ts
import { take } from 'rxjs/operators';
import {
  fromRandomCryptoStr,
  fromRandomCryptoCharset,
  fromRandomUUID,
} from '@rxjs-ninja/rxjs-random';

// Unbiased crypto string from a charset preset
fromRandomCryptoStr(12, 0, { caps: true, number: true }).pipe(take(1)).subscribe();

// Sample from a custom charset
fromRandomCryptoCharset(8, 'ab').pipe(take(1)).subscribe();

// RFC 4122 UUID (requires crypto.randomUUID)
fromRandomUUID().pipe(take(1)).subscribe();
// Output: `2a6d71bf-6ccd-4810-bc60-c9ffdedf8864`
```

### Web Crypto

Unbiased integers and byte buffers from `crypto.getRandomValues`.

```ts
import { take, reduce } from 'rxjs/operators';
import { fromRandomCryptoInt, fromRandomBytes } from '@rxjs-ninja/rxjs-random';

fromRandomCryptoInt(0, 10).pipe(take(5)).subscribe();
fromRandomBytes(16).pipe(take(1)).subscribe();
```
