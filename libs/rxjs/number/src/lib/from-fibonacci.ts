/**
 * @packageDocumentation
 * @module number
 */

import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fibonacci } from '../utils/from-fibonacci';

/**
 * The `fromFibonacci` operator is used to create an [Observable](https://rxjs.dev/api/index/class/Observable) sequence of
 * Fibonacci numbers
 *
 * @param iterations The number of iterations to do
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 *
 * @example
 * ```ts
 * fromFibonacci(5)
 *  .pipe(tap(console.log))
 *  .subscribe(console.log) // 0, 1, 1, 2, 3
 * ```
 *
 * @returns Observable of a Fibonacci sequence of numbers
 * @category RxJS Number Observables
 */
export function fromFibonacci(iterations: number, emitDelay = 0): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const memo = {};

    timer(0, emitDelay)
      .pipe(
        takeWhile((value) => !subscriber.closed && value < iterations),
        map((value) => (value === 0 ? 0 : fibonacci(value, memo))),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
