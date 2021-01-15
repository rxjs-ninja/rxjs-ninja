/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits the first value that does not pass the predicate
 *
 * @category Filter
 *
 * @typeParam T Type of the value from the source Observable
 *
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Return the first falsy number for the predicate
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(firstTruthy((value) => value % 2 === 0)).subscribe();
 * ```
 * Output: `1`
 *
 * @returns Observable that emits the first values to not pass the predicate
 */
export function firstFalsy<T extends unknown>(predicate: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      filter((value) => !predicate(value)),
      first(),
    );
}
