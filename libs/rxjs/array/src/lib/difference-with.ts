/**
 * @packageDocumentation
 * @module array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';
import { mapDifferenceWith } from '../utils/difference';

/**
 * The `differenceWith` can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) array of values
 * of T, passing in an array or Observable array of values to find the difference between the two. The returned array of
 * values only contains values from the source Observable
 *
 * An optional [[PredicateFn]] can be passed for more complex types, if none is passed a simple comparison (`===`)
 * will be used to determine the difference
 *
 * @typeParam T Type of item in the input array
 *
 * @param input Observable Array of items use to get the difference between two arrays
 * @param predicate Function for comparison of arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(differenceWith(['a', 'c']))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(differenceWith(of(['a', 'c'])))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(differenceWith(['A', 'C'], (x, y) => x === y.toLowerCase()))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(differenceWith(of(['A', 'C']), (x, y) => x === y.toLowerCase()))
 *  .subscribe(console.log) // ['b', 'd']
 * ```
 *
 * @returns Array of values of difference between the source and input array
 * @category RxJS Array Difference
 */
function differenceWith<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  predicate?: PredicateFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable(input)
      ? input.pipe(
          switchMap((inputFromSource) => source.pipe(map(mapDifferenceWith(inputFromSource as T[], predicate)))),
        )
      : source.pipe(map(mapDifferenceWith(input as T[], predicate)));
}

export { differenceWith };
