/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, takeLast } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits the last truthy value from a source.
 *
 * @category Boolean Filters
 *
 * @typeParam T The value contained in the source Observable
 *
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Return the last truthy string
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja'];
 * from(input).pipe(lastTruthy()).subscribe();
 * ```
 * Output: `'Ninja'`
 *
 * @example
 * Return the last truthy number
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(lastTruthy()).subscribe();
 * ```
 * Output: `6`
 *
 * @example
 * Return the last truthy number with predicate
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(lastTruthy((value) => value % 2 === 0 && value % 3 !== 0)).subscribe();
 * ```
 * Output: `4`
 *
 * @returns Observable that emits the last truthy value
 */
export function lastTruthy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(
      filter((value) => (predicate ? Boolean(value) && predicate(value) : Boolean(value))),
      takeLast(1),
    );
}
