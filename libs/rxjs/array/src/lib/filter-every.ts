/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable array where all the values in the array return true to a predicate function.
 * By default it will return the Observable array if all values are truthy.
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy or falsy value of array values
 *
 * @example
 * ```ts
 * const input = [ ['', '', ''], ['', 'Hello', ''], ['RxJS', 'Ninja', 'Rocks'] ];
 * fromArray(input).pipe(filterEvery()).subscribe()
 * // ['RxJS', 'Ninja', 'Rocks']
 * ```
 *
 * @example
 * ```ts
 * const input = [
 *  [1, 0, 1, 0, 1, 0]
 *  [1, 0, 2, 1, 0, 2],
 *  [0, 1, 0, 1, 0, 2]
 * ];
 * fromArray(input).pipe(filterEvery(v => v < 2)).subscribe()
 * // [1, 0, 1, 0, 1, 0]
 * ```
 *
 * @returns An Observable that emits an array containing all values in source array that return truthy with the [[PredicateFn]]
 * @category Array Filter
 */
export function filterEvery<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], T[]> {
  return (source) => source.pipe(filter((value) => value.every((v) => (predicate ? predicate(v) : Boolean(v)))));
}
