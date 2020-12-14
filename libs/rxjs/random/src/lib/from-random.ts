/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * Returns an Observable that emits random numbers generated using Math.random. The values are generated between the
 * passed `min` and `max` range.
 *
 * @category Random Numbers
 *
 * @param min The minimum value to create a random number between. Default is `0`.
 * @param max The maximum value to create a random number between. Default is `1`.
 * @param emitDelay Optionally emit each value at the set delay, otherwise emit immediately
 *
 * @example
 * Return random number between `0` and `10`
 * ```ts
 * fromRandom(0, 10).subscribe();
 * ```
 * Output: `8.332405921423248, 7.9304238877750315, 4.603376889484552...`
 *
 * @returns Observable that emits a random number between the `min` and `max`
 */
export function fromRandom(min = 0, max = 1, emitDelay = 0): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map((value) => Math.random() * (max - min) + min),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
