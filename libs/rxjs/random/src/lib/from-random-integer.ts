/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * Returns an Observable that emits random integer numbers generated using Math.random. The values are generated
 * between the passed `min` and `max` range.
 *
 * @category Random Numbers
 *
 * @param min The minimum value to create a random number between. Default is `0`.
 * @param max The maximum value to create a random number between. Default is `100`.
 * @param emitDelay Optionally emit each value at the set delay, otherwise emit immediately
 *
 * @example
 * Return random number between `0` and `100`
 * ```ts
 * fromRandomInt().subscribe();
 * ```
 * Output: `7, 94, 14, 12, 86...`
 *
 * @returns Observable that emits a random integer number between the `min` and `max`
 */
export function fromRandomInt(min = 0, max = 100, emitDelay = 0): Observable<number> {
  min = Math.ceil(min);
  max = Math.floor(max);

  return new Observable((subscriber: Subscriber<number>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map(() => Math.floor(Math.random() * (max - min + 1) + min)),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
