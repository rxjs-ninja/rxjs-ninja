/**
 * @packageDocumentation
 * @module Number
 */

import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';
import { fibonacci } from '../utils/from-fibonacci';

/**
 * Returns an Observable that emits a sequence of numbers in the Fibonacci sequence, starting from `0`
 *
 * @category Create
 *
 * @param iterations The number of iterations to do, must be greater than `0`
 * @param emitDelay If set the observable will emit per millisecond set, by default this is 0
 *
 * @example
 * Emit the first 5 numbers of the Fibonacci sequence immediately
 * ```ts
 * fromFibonacci(5).subscribe();
 * ```
 * Output: `0, 1, 1, 2, 3`
 *
 * @example
 * Emit the first 10 numbers of the Fibonacci sequence once per second, and skip `0`
 * ```ts
 * fromFibonacci(10, 1000).pipe(skip(1)).subscribe();
 * ```
 * Output: `1, 1, 2, 3, 5, 8, 13, 21, 34`
 *
 * @returns Observable of a Fibonacci sequence of numbers starting from `0`
 */
export function fromFibonacci(iterations: number, emitDelay = 0): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const memo = {};

    if (iterations <= 0) {
      subscriber.error(`fromFibonacci must be passed a positive integer value`);
      return subscriber.complete();
    }

    const sub = timer(0, emitDelay)
      .pipe(
        takeWhile((value) => value < iterations),
        map((value) => (value === 0 ? 0 : fibonacci(value, memo))),
        tap((value) => subscriber.next(value)),
        finalize(() => !subscriber.closed && subscriber.complete()),
      )
      .subscribe();

    subscriber.add(sub);
  });
}
