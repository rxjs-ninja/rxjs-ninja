/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { FromRandomCryptoOpts } from '../types/from-random-crypto';
import { getIntTypedArray } from '../utils/from-random-crypto';
import TypedArray = NodeJS.TypedArray;

/**
 * Default options for `fromRandomCrypto`
 * @type FromRandomCryptoOpts
 */
const DEFAULT_OPTIONS: FromRandomCryptoOpts = {
  bytes: 4,
  unsigned: false,
};

/**
 * An Observable string value generator that generates random numbers using [Crypto.getRandomValues](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
 * to generate a number. Pass an optional emit time to use as a timer.
 *
 * By default this will generate an unsigned 4-byte value `Int32Array`, pass additional options
 * to instead generate a 1-byte or 2-byte signed or unsigned, or 4bit signed value.
 *
 * [Typed Array Views](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays#Typed_array_views)
 *
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 * @param opts opts Options for different byte length of arrays, and unsigned and float values
 *
 * @example
 * ```ts
 * fromRandomCrypto()
 * .subscribe() // 1228475997, 258463200, 850749141, 3060206219...
 * ```
 *
 *  @example
 * ```ts
 * fromRandomCrypto(0, { bytes: 1 })
 * .subscribe() // 15, 8, 234, 12...
 * ```
 *
 * @returns Observable with a stream of random numbers
 * @category Random Observables
 */
export function fromRandomCrypto(emitDelay = 0, opts: FromRandomCryptoOpts = DEFAULT_OPTIONS): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const sourceArray = getIntTypedArray(opts.bytes, opts.unsigned);

    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        tap(() => window.crypto.getRandomValues(sourceArray as TypedArray)),
        map(() => (sourceArray as TypedArray)[0]),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
