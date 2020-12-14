/**
 * @packageDocumentation
 * @module Boolean
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits only truthy values from a source
 *
 * @category Boolean Filters
 *
 * @typeParam T The value contained in the source Observable
 *
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Returns a string value from a source where the string is truthy
 * ```ts
 * const input = ['', 'RxJS', '', 'Ninja', ''];
 * from(input).pipe(filterTruthy()).subscribe();
 * ```
 * Output: `'RxJS', 'Ninja'`
 *
 * @example
 * Returns a string value from a source where the string passes the predicate
 * ```ts
 * const input = ['', 'RxJS', '', 'Ninja', ''];
 * from(input).pipe(filterTruthy(v => v.length < 5 )).subscribe();
 * ```
 * Output: `'RxJS'`
 *
 * @example
 * Returns a number value from a source where the number is truthy
 * ```ts
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(filterTruthy()).subscribe();
 * ```
 * Output: `2, 4`
 *
 * @example
 * Returns a number value from a source where the number passes the predicate
 * ```ts
 * const mod3 = (num: number) => num % 3 === 0
 * const input = [0, 1, 2, 3, 4, 5, 6];
 * from(input).pipe(filterTruthy(mod3)).subscribe();
 * ```
 * Output: `3, 6`
 *
 * @returns Observable that emits only truthy values or values that pass the optional [[PredicateFn]]
 */
export function filterTruthy<T extends unknown>(predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    source.pipe(filter((value) => (predicate ? Boolean(value) && predicate(value) : Boolean(value))));
}
