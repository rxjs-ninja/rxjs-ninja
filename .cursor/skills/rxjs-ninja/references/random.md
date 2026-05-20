# @rxjs-ninja/rxjs-random

**npm:** `@rxjs-ninja/rxjs-random` (3.x) · **peer:** `rxjs@7` · **API:** https://rxjs-ninja.tane.dev/modules/random.html

Observable factories for **Math.random** and **Web Crypto** random values (no SubtleCrypto).

## Import

```ts
import { take } from 'rxjs/operators';
import { fromRandom, fromRandomCryptoInt, fromRandomUUID } from '@rxjs-ninja/rxjs-random';
```

All exports are **creators** (call directly, not typically used as `source$.pipe(...)`).

## Math.random

| Function | Emits |
|----------|--------|
| `fromRandom(min?, max?)` | `number` in range (default 0–1) |
| `fromRandomInt(min, max, delay?)` | Integer in inclusive range |
| `fromRandomStr(length, delay?, options?)` | String from charset presets |

```ts
fromRandom(5, 10).pipe(take(5)).subscribe();
```

Options type: `FromRandomStringOpts` · defaults: `RND_STR_DEFAULTS`.

## Web Crypto

| Function | Emits | Notes |
|----------|--------|--------|
| `fromRandomCryptoInt(min, max, delay?)` | Unbiased integer | `getRandomValues` |
| `fromRandomBytes(length, delay?)` | `Uint8Array` | Fixed byte length |
| `fromRandomCrypto(delay?, opts?)` | number | Byte-width options (`FromRandomCryptoOpts`) |
| `fromRandomCryptoStr(len, delay?, opts?)` | string | Charset flags: caps, lower, number, special |
| `fromRandomCryptoCharset(len, charset, delay?)` | string | Exact charset string |
| `fromRandomUUID(delay?)` | UUID v4 string | Needs `crypto.randomUUID` |
| `fromUUIDv4(delay?)` | UUID v4 string | Legacy name; prefer `fromRandomUUID` |

```ts
import { take } from 'rxjs/operators';
import {
  fromRandomCryptoInt,
  fromRandomBytes,
  fromRandomCryptoStr,
  fromRandomUUID,
} from '@rxjs-ninja/rxjs-random';

fromRandomCryptoInt(0, 10).pipe(take(5)).subscribe();
fromRandomBytes(16).pipe(take(1)).subscribe();
fromRandomCryptoStr(12, 0, { caps: true, number: true }).pipe(take(1)).subscribe();
fromRandomUUID().pipe(take(1)).subscribe();
```

## Combining with other packages

```ts
import { take } from 'rxjs/operators';
import { filterInRange } from '@rxjs-ninja/rxjs-number';
import { fromRandomCrypto } from '@rxjs-ninja/rxjs-random';

fromRandomCrypto(0, { bytes: 1, unsigned: true })
  .pipe(take(50), filterInRange(-64, 64))
  .subscribe();
```

## Gotchas

- Creators emit **indefinitely** unless you `take`, `takeUntil`, or unsubscribe.
- **`fromRandomUUID`**: fails at subscribe time if `randomUUID` is missing (use feature detect in app code).
- **`fromRandomCrypto` / charset helpers**: use uniform index sampling (not `Math.random`).
- Browser crypto specs may live in Playwright demos; Node 19+ supports UUID.

## Types

`FromRandomCryptoOpts`, `FromRandomStringOpts`
