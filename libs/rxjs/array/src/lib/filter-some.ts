/**
 * @packageDocumentation
 * @module Array
 */
import { PredicateFn } from '../types/array-compare';
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Returns an Observable array where one of the values in the array return true to a predicate function.
 * By default it will return the Observable array if one value is truthy.
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy or falsy value of array values
 *
 * @example
 * ```ts
 * const input = [
 *  ['RxJS', 'Rocks']
 *  ['RxJS', 'Ninja'],
 *  ['Foo', 'Bar']
 * ];
 *
 * fromArray(input).pipe(filterSome(v => v === 'RxJS')).subscribe()
 * // ['RxJS', 'Rocks'], ['RxJS', 'Ninja']
 * ```
 *
 * @returns Observable array containing all values in source array that return has one truthy value with the [[PredicateFn]]
 * @category RxJS Array Filter
 */
export function filterSome<T extends unknown>(predicate?: PredicateFn): MonoTypeOperatorFunction<T[]> {
  return (source) => source.pipe(filter((value) => value.some((v) => (predicate ? predicate(v) : Boolean(v)))));
}
