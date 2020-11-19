/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortFn } from '../types/search';
import { defaultSortFn } from '../utils/binary-search';

/**
 * The `sort` operator takes an array of `T` items and returns the array sorted.
 *
 * By default the operator can do basic quality check on `string`, `number` and `boolean` values,
 * and can take an optional method to do more complex searches for items such as array or objects
 *
 * @typeParam T The type of data in the input array
 *
 * @param fn Optional sorting function
 *
 * @returns Array of sorted values
 * @category RxJS Array Modify
 */
export function sort<T extends unknown>(fn?: SortFn): MonoTypeOperatorFunction<T[]> {
  const sortFn = fn || defaultSortFn;
  return (source: Observable<T[]>) => source.pipe(map((arr) => arr.sort((a, b) => sortFn(a, b))));
}
