/**
 * @packageDocumentation
 * @module Array
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { binarySearcher } from '../utils/search';
import { defaultSortFn } from '../utils/sort';
import { BinarySearchResult } from '../types/binary-search';
import { SortFn } from '../types/generic-methods';

/**
 * Returns an Observable that emits a [[BinarySearchResult]]. It take a source array and runs a [[SortFn]] over it.
 * Then it tries to find the the `searchValue` in the array. The `BinarySearchResult` contains the index in the sorted
 * array, the value searched and the sorted and unsorted array. If not found the index is `-1`.
 *
 * @category Query
 *
 * @see {@link https://en.wikipedia.org/wiki/Binary_search_algorithm|Binary search algorithm}
 *
 * @typeParam T The type of the value to search for
 * @typeParam K The type of the value in the array
 *
 * @param searchValue The value to search for in the array
 * @param sortFn Optional [[SortFn]] for sorting more complex types
 * @param property Optional property for searching tuples and objects - if an tuple use a `number` if an `Object` use a
 *   `string`
 *
 * @example
 * Return the index of the word `bravo` in the sorted array from a source array
 * ```ts
 * const input = ['bravo', 'delta', 'alpha', 'echo', 'charlie'];
 * of(input).pipe(binarySearch('bravo')).subscribe();
 * ```
 * Output: `<BinarySearchResult>[1, 'bravo', [...sortedArray], [...searchArray]]`
 *
 * @example
 * Return the index of the number `30` in the sorted array from the source array
 * ```ts
 * const input = [100, 90, 10, 20, 40, 80, 30, 25];
 * of(input).pipe(binarySearch(30)).subscribe();
 * ```
 * Output: `<BinarySearchResult>[3, 30, [...sortedArray], [...searchArray]]`
 *
 * @example
 * Return the index of the object that has `label` of `Baz`, sorted using an `index` value
 * ```ts
 * const input = [
 *  { index: 5, label: 'Angular' }, { index: 7, label: 'RxJS' },
 *  { index: 8, label: 'Ninja' }, { index: 10, label: 'TypeScript' },
 *  { index: 1, label: 'JavaScript' }, { index: 4, label: 'ECMAScript' },
 * ];
 * const sortObj = (a:, b) => {
 *  if (a.index === b.index) return 0;
 *  return a.index < b.index ? -1 : 1;
 * };
 * of(input).pipe(binarySearch('Ninja', sortObj, 'label')).subscribe();
 * ```
 * Output: `<BinarySearchResult>[4, 'Ninja', [...sortedArray], [...searchArray]]`
 *
 * @example
 * Return the index of the tuple in the array where the value at index `0` is `2`, sorted by the index `1`
 * ```ts
 * const input = [
 *  [1, 1], [2, 4], [3, 7], [4, 2], [5, 5],
 *  [6, 6], [7, 3], [8, 8], [9, 10], [10, 9]
 * ];
 * const sortArray = (a: [number, number], b: [number, number]) => {
 *  if (a[1] === b[1]) return 0;
 *  return a[1] < b[1] ? -1 : 1;
 * };
 * from(input).pipe(binarySearch(2, sortArray, 0)).subscribe();
 * ```
 * Output: `<BinarySearchResult>[4, 2, [...sortedArray], [...searchArray]]`
 *
 * @returns An Observable that emits a [[BinarySearchResult]]
 */
export function binarySearch<T extends unknown, K extends T | unknown>(
  searchValue: T,
  sortFn?: SortFn<K>,
  property?: string | number,
): OperatorFunction<K[] | Set<K>, BinarySearchResult<T, K>> {
  return (source: Observable<K[] | Set<K>>) =>
    source.pipe(
      map<K[] | Set<K>, [K[], K[]]>((accArray) => [[...accArray], [...accArray].sort(sortFn || defaultSortFn)]),
      map(([searchArray, sortedArray]) => [
        binarySearcher(searchValue, sortedArray, property),
        searchValue,
        sortedArray,
        searchArray,
      ]),
    );
}
