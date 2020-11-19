import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * Get the fibonacci number
 * @private
 * @param n
 * @param memo
 */
function fibonacci(n: number, memo: { [key: number]: number } = {}): number {
  return memo[n] || (n <= 2 ? 1 : (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)));
}

/**
 * Emits a Fibonacci sequence up to the total number of iterations passed.
 * @param iterations
 * @param emitDelay
 */
export function fromFibonacci(iterations: number, emitDelay = 0): Observable<number> {
  return new Observable((subscriber: Subscriber<number>) => {
    const memo = {};

    timer(0, emitDelay)
      .pipe(
        takeWhile((value) => !subscriber.closed && value <= iterations),
        map((value) => (value === 0 ? 0 : fibonacci(value, memo))),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}
