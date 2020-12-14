/**
 * @packageDocumentation
 * @module Boolean
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits a boolean value from a source value of any type
 *
 * @category Boolean Modify
 *
 * @typeParam T The value contained in the source Observable
 *
 * @param predicateFn Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Returns boolean values for source strings
 * ```ts
 * const input = ['', 'Hello', 'RxJS', ''];
 * from(input).pipe(toBoolean()).subscribe()
 * ```
 * Output: `false, true, true, false`
 *
 * @example
 * Returns boolean values for source strings with predicate
 * ```ts
 * const input = ['', 'Hello', 'RxJS', ''];
 * from(input).pipe(toBoolean(v => v.length < 5)).subscribe()
 * ```
 * Output: `true, false, true, true`
 *
 * @returns Observable that emits a boolean value of a source value
 */
export function toBoolean<T extends unknown>(predicateFn?: PredicateFn<T>): OperatorFunction<T, boolean> {
  return (source: Observable<T>) => source.pipe(map((value) => (predicateFn ? predicateFn(value) : Boolean(value))));
}
