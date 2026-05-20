/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { FromRandomStringOpts } from '../types/from-random-string';
import { cryptoRandomIndex } from '../utils/crypto-random-int';
import { createSeedArray, RND_STR_DEFAULTS } from '../utils/from-random-string';

/**
 * Returns an Observable that emits random strings built only from `crypto.getRandomValues` (no `Math.random`).
 *
 * @category Random Strings
 *
 * @param length Length of each string (default `10`)
 * @param emitDelay Optional delay in milliseconds between emissions (default `0`)
 * @param opts Character set options (same as [[fromRandomStr]])
 *
 * @example
 * Emit an 8-character alphanumeric string
 * ```ts
 * fromRandomCryptoStr(8).pipe(take(3)).subscribe();
 * ```
 *
 * @returns Observable that emits random strings
 */
export function fromRandomCryptoStr(
  length = 10,
  emitDelay = 0,
  opts: FromRandomStringOpts = RND_STR_DEFAULTS,
): Observable<string> {
  const seedArray = createSeedArray(opts);
  if (seedArray.length === 0) {
    throw new Error('fromRandomCryptoStr requires at least one character class enabled in opts');
  }

  return new Observable((subscriber) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() =>
          [...Array(length)]
            .map(() => seedArray[cryptoRandomIndex(seedArray.length)] as string)
            .join(''),
        ),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}

/**
 * Returns an Observable that emits random strings using characters from an explicit charset and `crypto.getRandomValues`.
 *
 * @category Random Strings
 *
 * @param length Length of each string
 * @param charset Characters to sample from (must be non-empty)
 * @param emitDelay Optional delay in milliseconds between emissions (default `0`)
 *
 * @returns Observable that emits random strings from the charset
 */
export function fromRandomCryptoCharset(
  length: number,
  charset: string,
  emitDelay = 0,
): Observable<string> {
  const chars = [...charset];
  if (chars.length === 0) {
    throw new Error('charset must contain at least one character');
  }

  return new Observable((subscriber) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() =>
          [...Array(length)]
            .map(() => chars[cryptoRandomIndex(chars.length)] as string)
            .join(''),
        ),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}
