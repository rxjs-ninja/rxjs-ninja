/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/boolean';

/**
 * Returns an Observable that emits a boolean based on the input value:
 *
 * - If no predicate method, the value will be converted to it's Boolean value
 * - If a [[PredicateFn]] is passed it's used to convert the source value to a boolean based on the function condition
 *
 * @category Create
 *
 * @typeParam T Type of the value from the source Observable
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
 * @returns Observable that emits a boolean value of a source value Boolean conversion
 */
export function toBoolean<T extends unknown>(predicateFn?: PredicateFn<T>): OperatorFunction<T, boolean> {
  return (source) => source.pipe(map((value) => (predicateFn ? predicateFn(value) : Boolean(value))));
}
