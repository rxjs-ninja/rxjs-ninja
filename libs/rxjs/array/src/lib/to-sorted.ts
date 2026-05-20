/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaultSortFn } from '../utils/sort';
import { SortFn } from '../types/generic-methods';

/**
 * Returns an Observable array sorted without mutating the source using `Array.prototype.toSorted`.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the Array or Set
 *
 * @param sortFn Optional [[SortFn]]; defaults to `defaultSortFn`
 *
 * @returns An Observable that emits the sorted array
 */
export function toSorted<T extends unknown>(sortFn?: SortFn<T>): OperatorFunction<Iterable<T>, T[]> {
  return (source) => source.pipe(map((value) => [...value].toSorted(sortFn || defaultSortFn)));
}
