/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits the first truthy value from a source Observable with `Boolean`, An optional [[PredicateFn]]
 * can be passed to return values that pass it's equality check.
 *
 * @typeParam T The value contained in the source Observable
 *
 * @param predicate Optional [[PredicateFn]] to return the truthy value
 *
 * @example
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja'];
 * from(input).pipe(firstTruthy()).subscribe();
 * // 'Hello'
 * ```
 *
 * @example
 * ```ts
 * const input = [1, 2, 3, 4];
 * from(input).pipe(firstTruthy((value) => value % 2 === 0)).subscribe();
 * // 2
 * ```
 *
 * @returns Observable that emits the first Boolean truthy value or value that pass the optional [[PredicateFn]] equality check
 * @category RxJS Boolean Filters
 */
export function firstTruthy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(
      filter((val) => (predicate ? predicate(val) : Boolean(val))),
      first(),
    );
}
