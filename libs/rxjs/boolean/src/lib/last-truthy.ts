/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter, takeLast } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 /**
 * Returns an Observable that emits only the last truthy value from a source Observable with `Boolean`, An optional [[PredicateFn]]
 * can be passed to return values that pass it's equality check
 *
 * @typeParam T The value contained in the source Observable
 *
 * @param predicate Optional [[PredicateFn]] to return the truthy value
 *
 * @example
 * ```ts
 * const input = ['a', 'b', '', 'c', ''];
 * from(input).pipe(lastTruthy()).subscribe();
 * // 'c'
 * ```
 *
 * @example
 * ```ts
 * const input = [1, 2, 3, 4];
 * fromNumber(input).pipe(lastTruthy((value) => value % 2 === 0)).subscribe();
 * // 4
 * ```
 *
 * @returns Observable that emits the last Boolean truthy value or value that pass the optional [[PredicateFn]] equality check
 * @category Boolean Filters
 */
export function lastTruthy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(
      filter((val) => (predicate ? predicate(val) : Boolean(val))),
      takeLast(1),
    );
}
