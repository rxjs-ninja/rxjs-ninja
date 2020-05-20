import { Observable, OperatorFunction } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { binarySearcher, defaultSearch } from '../utils/binary-search';
import { ArraySearchResult, SortFn } from '../types/binary-search';

export function binarySearch<T>(searchValue: T | T[], sort?: SortFn): OperatorFunction<T | T[], ArraySearchResult> {
  const sortFn = sort ? sort : defaultSearch;

  return (source: Observable<T | T[]>) =>
    source.pipe(
      reduce<T, T[]>((acc, val) => (Array.isArray(val) ? [...acc, ...val] : [...acc, val]), []),
      map((accArray) => accArray.sort(sortFn)),
      map((sortedArray) => {
        console.log(sortedArray, searchValue);
        const index = binarySearcher(searchValue, sortedArray);
        return {
          searchValue: searchValue,
          searchArray: sortedArray,
          index,
        };
      }),
    );
}
