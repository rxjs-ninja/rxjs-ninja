/**
 * @packageDocumentation
 * @module Random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * An Observable string value generator that generates random numbers using [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
 * to generate a number between the min and max value passed. Pass an optional emit time to use as a timer
 *
 * @param min The minimum value to create a random number between
 * @param max The maximum value to create a random number between
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 *
 * @example
 * ```ts
 * fromRandom(0, 10)
 * .subscribe() // 8.332405921423248, 7.9304238877750315, 4.603376889484552...
 * ```
 *
 * @returns Observable with a stream of random numbers
 * @category RxJS Random Observables
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
