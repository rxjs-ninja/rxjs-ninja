/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * An Observable string value generator that generates random integer numbers using [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
 * to generate a number between the min and max value passed. Pass an optional emit time to use as a timer
 *
 * @param min The minimum value to create a random integer up to
 * @param max The maximum value to create a random integer from
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 *
 * @example
 * ```ts
 * fromRandomInt(0, 10)
 * .subscribe() // 8, 10, 5, 0, 10, 1, 8...
 * ```
 *
 * @returns Observable with a stream of random integers
 * @category RxJS Random Observables
 */
export function fromRandomInt(min = 0, max = 100, emitDelay = 0): Observable<number> {
  min = Math.ceil(min);
  max = Math.floor(max);

  return new Observable((subscriber: Subscriber<number>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map((value) => Math.floor(Math.random() * (max - min + 1) + min)),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
