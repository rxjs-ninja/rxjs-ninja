import { observe } from 'rxjs-marbles/jest';
import { reduce, take, tap } from 'rxjs/operators';
import {
  fromRandomBytes,
  fromRandomCryptoCharset,
  fromRandomCryptoInt,
  fromRandomCryptoStr,
  fromRandomUUID,
} from '@rxjs-ninja/rxjs-random';

const hasRandomUUID = typeof globalThis.crypto?.randomUUID === 'function';

describe('random crypto gap operators', () => {
  it(
    'fromRandomCryptoInt emits integers in range',
    observe(() =>
      fromRandomCryptoInt(0, 5).pipe(
        take(20),
        reduce<number, number[]>((acc, val) => [...acc, val], []),
        tap((values) => {
          expect(values.every((v) => Number.isInteger(v) && v >= 0 && v <= 5)).toBe(true);
        }),
      ),
    ),
  );

  it(
    'fromRandomBytes emits buffers of the requested length',
    observe(() =>
      fromRandomBytes(8).pipe(
        take(3),
        reduce<Uint8Array, Uint8Array[]>((acc, val) => [...acc, val], []),
        tap((values) => {
          expect(values.every((v) => v instanceof Uint8Array && v.length === 8)).toBe(true);
        }),
      ),
    ),
  );

  it(
    'fromRandomCryptoStr uses only charset characters',
    observe(() =>
      fromRandomCryptoStr(12, 0, { caps: true, lower: false, number: true, special: false }).pipe(
        take(5),
        tap((value) => {
          expect(value).toMatch(/^[A-Z0-9]{12}$/);
        }),
      ),
    ),
  );

  it(
    'fromRandomCryptoCharset samples from the given charset',
    observe(() =>
      fromRandomCryptoCharset(4, 'ab').pipe(
        take(10),
        tap((value) => {
          expect(value).toMatch(/^[ab]{4}$/);
        }),
      ),
    ),
  );

  (hasRandomUUID ? it : it.skip)(
    'fromRandomUUID emits RFC 4122 UUID strings',
    observe(() =>
      fromRandomUUID().pipe(
        take(2),
        tap((value) => {
          expect(value).toMatch(
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
          );
        }),
      ),
    ),
  );
});
