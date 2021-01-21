/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';
import { createSeedArray, RND_STR_DEFAULTS } from '../utils/from-random-string';

/**
 * Returns an Observable that emits a string generated at random.
 *
 * By default the string will be made up of upper and lower case characters, and numbers.
 * For special characters pass a [[FromRandomStringOpts]] options object
 *
 * @category Random Strings
 *
 * @param length The length of the string to produce
 * @param emitDelay Optionally emit each value at the set delay, otherwise emit immediately
 * @param opts Additional options to include other characters and numbers
 *
 * @example
 * Emit a random string of length `8`
 * ```ts
 * fromRandomStr(8).subscribe();
 * ```
 * Output: `'A3gtYb76', '0br2YgT6', 'TL184Avf'...`
 *
 * @example
 * Emit a random string of length `8` with special characters every second
 * ```ts
 * const options = { caps: true, lower: true, number: true, special: true };
 * fromRandomStr(8, 1000, options).subscribe();
 * ```
 * Output: `'A3g!^b76', '0br2£gT6', 'TL1!4Av$'...`
 *
 * @returns Observable that emits a string
 */
export function fromRandomStr(length = 10, emitDelay = 0, opts = RND_STR_DEFAULTS): Observable<string> {
  const seedArray = createSeedArray(opts);

  return new Observable((subscriber: Subscriber<string>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() => [...Array(length)].map(() => seedArray[(Math.random() * seedArray.length) | 0]).join('')),
        tap((value) => subscriber.next(value)),
      )
      .subscribe();
  });
}
