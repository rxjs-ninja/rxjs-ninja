/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { cryptoRandomInt } from '../utils/crypto-random-int';

/**
 * Returns an Observable that emits unbiased random integers in the inclusive `[min, max]` range using
 * `crypto.getRandomValues` (no `Math.random`).
 *
 * @category Random Numbers
 *
 * @param min Minimum value (default `0`)
 * @param max Maximum value (default `100`)
 * @param emitDelay Optional delay in milliseconds between emissions (default `0`)
 *
 * @example
 * Emit cryptographically fair integers from `0` to `10`
 * ```ts
 * fromRandomCryptoInt(0, 10).pipe(take(5)).subscribe();
 * ```
 *
 * @returns Observable that emits unbiased random integers
 */
export function fromRandomCryptoInt(min = 0, max = 100, emitDelay = 0): Observable<number> {
  return new Observable((subscriber) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() => cryptoRandomInt(min, max)),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}
