/**
 * @packageDocumentation
 * @module array
 */

import { PredicateFn } from '../types/array-compare';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * The `filterEvery` operator returns an array of values that have a value in the array that matches the predicate
 *
 * @param predicate Method used to check if array contains all valid members
 *
 * @example
 * ```ts
 * fromArray([
 *  [1, 0, 1, 0, 1, 0]
 *  [1, 0, 2, 1, 0, 2],
 *  [0, 1, 0, 1, 0, 2]
 *]).pipe(
 *  every(v => v < 2),
 *).subscribe() // [1, 0, 1, 0, 1, 0]
 * ```
 *
 * @returns Array of values where every value matches the predicate method
 * @category RxJS Array Filter
 */
export function filterEvery<T extends unknown>(predicate: PredicateFn<T>): OperatorFunction<T[], T[]> {
  return (source) => source.pipe(filter((value) => value.every((v) => predicate(v))));
}
