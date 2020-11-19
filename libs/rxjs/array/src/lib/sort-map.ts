/**
 * @packageDocumentation
 * @module array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortFn } from '../types/sort';
import { defaultSortFn } from '../utils/binary-search';
import { MapFn } from '../types/array-compare';

/**
 * The `sortMap` operator takes an array of `T` items and returns a mapped array of items, either T or K
 *
 * For sorting the operator can do basic quality check on `string` and `number` values,
 * and can take an optional method to do more complex searches for items such as array or objects
 *
 * @typeParam T The type of data in the input array
 * @typeParam K The type of data in the output array, this can be T or any other value type
 *
 * @param mapFn The mapping function to change the value
 * @param fn Optional sorting function
 *
 * @example
 * ```ts
 * of([5, 8, 2, 7, 1, 6])
 * .pipe(
 *    sortMap(value => value >= 5 ? true : false)
 *  ).subscribe() // [false, false, true, true, true, true]
 * ```
 *
 * @returns Array of sorted and mapped values
 * @category RxJS Array Modify
 */
export function sortMap<T extends any, K extends T | unknown>(
  mapFn: MapFn<T, K>,
  fn?: SortFn,
): OperatorFunction<T[], K[]> {
  const sortFn = fn || defaultSortFn;
  return (source: Observable<T[]>) =>
    source.pipe(
      map((arr) => arr.sort(sortFn)),
      map((arr) => arr.map(mapFn)),
    );
}
