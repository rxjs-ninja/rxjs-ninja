/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits the first truthy value from a source that is truthy for Boolean conversion of the
 * value - with optional [[PredicateFn]] to further filter the truthy values with a stricter check
 *
 * @category Filter
 *
 * @typeParam T Type of the value from the source Observable
 *
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Return the first truthy string
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja'];
 * from(input).pipe(firstTruthy()).subscribe();
 * ```
 * Output: `'Hello'`
 *
 * @example
 * Return the first truthy number
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(firstTruthy()).subscribe();
 * ```
 * Output: `1`
 *
 * @example
 * Return the first truthy number with predicate
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(firstTruthy((value) => value % 2 === 0)).subscribe();
 * ```
 * Output: `2`
 *
 * @returns Observable that emits the first truthy value
 */
export function firstTruthy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source) =>
    source.pipe(
      filter((value) => (predicate ? Boolean(value) && predicate(value) : Boolean(value))),
      first(),
    );
}
