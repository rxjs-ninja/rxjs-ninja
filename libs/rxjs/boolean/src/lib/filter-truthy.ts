/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits only truthy values from a source Observable with `Boolean`, An optional [[PredicateFn]]
 * can be passed to return values that pass it's equality check
 *
 * @typeParam T The value contained in the source Observable
 *
 * @param predicate Optional [[PredicateFn]] to return the truthy value
 *
 * @example
 * ```ts
 * const input = ['', 'test1', '', 'test2', ''];
 * from(input).pipe(filterTruthy()).subscribe();
 * // ['test1', 'test2']
 * ```
 * @example
 * ```ts
 * const isEven = (num: number) => num % 2 === 0
 * const input = [0, 1, 2, 3, 4, 5];
 * from(input).pipe(filterTruthy(isEven)).subscribe();
 * // [0, 2, 4]
 * ```
 *
 * @returns Observable that emits only truthy values or values that pass the optional [[PredicateFn]] equality check
 * @category Boolean Filters
 */
export function filterTruthy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.pipe(filter((value) => (predicate ? predicate(value) : Boolean(value))));
}
