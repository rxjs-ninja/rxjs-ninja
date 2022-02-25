/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { BinarySearchResult } from '../types/binary-search';
import { SortFn } from '../types/generic-methods';
import { createOrReturnObservable } from '../utils/internal';
import { binarySearcher } from '../utils/search';
import { defaultSortFn } from '../utils/sort';

/**
 * Returns an Observable that emits a [[BinarySearchResult]]. It take a source Array or Set and runs a [[SortFn]] over
 * it, then searches it for the passed `search` value. The `BinarySearchResult` contains the index in the sorted array,
 * the value searched and the sorted and unsorted array. If not found the index is `-1`.
 *
 * @category Query
 *
 * @see {@link https://en.wikipedia.org/wiki/Binary_search_algorithm|Binary search algorithm}
 *
 * @typeParam T The type of the search value
 * @typeParam V The type of item in the Array if different to search type
 *
 * @param search The value to search for in the Array
 * @param property Optional property for searching tuples and objects - if an tuple use a `number` if an `Object` use a
 *   `string`
 * @param sortFn Optional [[SortFn]] for sorting more complex types
 *
 * @example
 * Return the index of the word `bravo` in the sorted Array from a source array
 * ```ts
 * const input = ['bravo', 'delta', 'alpha', 'echo', 'charlie'];
 * of(input).pipe(binarySearch('bravo')).subscribe();
 * ```
 * Output: `<BinarySearchResult>[1, 'bravo', [...sortedArray], [...searchArray]]`
 *
 * @example
 * Return the index of the number `30` in the sorted Array from the source array
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
 * Return the index of the tuple in the Array where the value at index `0` is `2`, sorted by the index `1`
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
export function binarySearch<T extends unknown, V extends unknown>(
  search: Subscribable<T> | T,
  property?: Subscribable<string | number> | string | number,
  sortFn?: SortFn<V>,
): OperatorFunction<Iterable<V>, BinarySearchResult<T, V>> {
  const search$ = createOrReturnObservable(search);
  const property$ = createOrReturnObservable(property);

  return (source) =>
    source.pipe(
      map<Iterable<V>, [V[], V[]]>((accArray) => [[...accArray], [...accArray].sort(sortFn || defaultSortFn)]),
      withLatestFrom(search$, property$),
      map<[[V[], V[]], T, string | number | undefined], BinarySearchResult<T, V>>(
        ([[searchArray, sortedArray], searchValue, propertyValue]) => [
          binarySearcher(search, sortedArray, propertyValue),
          searchValue,
          sortedArray,
          searchArray,
        ],
      ),
    );
}
