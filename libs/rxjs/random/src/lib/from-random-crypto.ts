/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { FromRandomCryptoOpts } from '../types/from-random-crypto';
import { getIntTypedArray, RND_CRYPTO_DEFAULTS } from '../utils/from-random-crypto';

/**
 * Returns an Observable that emits a number generated using Crypto.getRandomValues, and using Math.random selects one
 * random number value from the `TypedArray`.
 *
 * By default this Observable will generate `4-bit signed` values
 *
 * @category Random Numbers
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays#Typed_array_views|Typed Array Views}
 *
 * @param emitDelay Optionally emit each value at the set delay, otherwise emit immediately
 * @param opts Optional options for the Observable to generate different byte lengths and signed numbers
 *
 * @example
 * Emits a stream of random `4-byte` numbers
 * ```ts
 * fromRandomCrypto().subscribe();
 * ```
 * Output: `1228475997, 258463200, 850749141, 3060206219...`
 *
 *  @example
 *  Emits a stream of random `1-byte` every second
 * ```ts
 * fromRandomCrypto(1000, { bytes: 1 }).subscribe();
 * ```
 * Output: `15, 8, 234, 12...`
 *
 * @returns Observable with a stream of random numbers
 */
export function fromRandomCrypto(emitDelay = 0, opts: FromRandomCryptoOpts = RND_CRYPTO_DEFAULTS): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const sourceArray = getIntTypedArray(opts.bytes, opts.unsigned);

    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        tap(() => window.crypto.getRandomValues(sourceArray)),
        map(() => sourceArray[(sourceArray.length * Math.random()) | 0]),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}
