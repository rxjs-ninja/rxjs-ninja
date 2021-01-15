/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, takeLast } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits the last value that does not pass the predicate
 *
 * @category Filter
 *
 * @typeParam T Type of the value from the source Observable
 *
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Return the last falsy number for the predicate
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(lastFalsy((value) => value % 2 === 0)).subscribe();
 * ```
 * Output: `5`
 *
 * @returns Observable that emits the last values to not pass the predicate
 */
export function lastFalsy<T extends unknown>(predicate: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      filter((value) => !predicate(value)),
      takeLast(1),
    );
}
