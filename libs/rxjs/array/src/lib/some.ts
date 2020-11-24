/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/array-compare';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `some` operator returns a boolean value if the array from the observable source has at least one
 * member that passes the passed predicate method
 *
 * @param predicate Method used to check if array contains a valid member
 *
 * @example
 * ```ts
 * fromArray([
 *  ['RxJS', 'Rocks']
 *  ['RxJS', 'Ninja'],
 *  ['Foo', 'Bar']
 *]).pipe(
 *  some(v => v === 'RxJS'),
 *).subscribe() // [true, true, false]
 * ```
 *
 * @returns Boolean value if the array contains a value to matches the predicate
 * @category RxJS Array Query
 */
export function some<T extends unknown>(predicate: PredicateFn<T>): OperatorFunction<T[], boolean> {
  return (source) => source.pipe(map((value) => value.some((v) => predicate(v))));
}
