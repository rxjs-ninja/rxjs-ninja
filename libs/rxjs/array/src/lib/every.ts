/**
 * @packageDocumentation
 * @module Array
 */

import { PredicateFn } from '../types/generic-methods';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable array of values when all values in the array return truthy for a predicate. By default if all
 * values are truthy it will return, otherwise pass the predicate to check values.
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * ```ts
 * const input = [ [false, false, false], [false, true, true], [true, true, true] ];
 * fromArray(input).pipe(every()).subscribe();
 * // [false, false, true]
 * ```
 *
 * @example
 * ```ts
 * const input = [ [1, 0, 1, 0, 1, 0], [1, 0, 2, 1, 0, 2], [0, 1, 0, 1, 0, 2] ];
 * fromArray(input).pipe(every(v => v < 2)).subscribe();
 * // [true, false, false]
 * ```
 *
 * @returns An Observable that emits a boolean when all values in source array return truthy with the [[PredicateFn]]
 * @category Array Query
 */
export function every<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<T[], boolean> {
  return (source) => source.pipe(map((value) => value.every((v) => (predicate ? predicate(v) : Boolean(v)))));
}
