/**
 * @packageDocumentation
 * @module array
 */
import { MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';
import { mapIntersectsWith } from '../utils/intersects';

/**
 * The `intersectsWith` can be used with an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) array of values
 * of T, passing in an array or Observable array of values to find the intersection between the two. The returned array of
 * values only contains values from the source Observable
 *
 * An optional predicate method can be passed for more complex types, if none is passed a simple comparison (`===`)
 * will be used to determine the intersection
 *
 * @typeParam T The type of data in the input array
 *
 * @param input Array of items use to get the intersection between two arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(['a', 'e']))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: T[]): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable Array of items use to get the intersection between two arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(of(['a', 'e'])))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: ObservableInput<T[]>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Array of items use to get the intersection between two arrays
 * @param predicate Function for comparison of arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(['A', 'E'], (x, y) => x === y.toLowerCase()))
 *  .subscribe(console.log) // ['a', 'c']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: T[], predicate: PredicateFn<T>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable Array of items use to get the intersection between two arrays
 * @param predicate Function for comparison of arrays
 *
 * @example
 * ```ts
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(of(['A', 'E']), (x, y) => x === y.toLowerCase()))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: ObservableInput<T[]>, predicate: PredicateFn<T>): MonoTypeOperatorFunction<T[]>;
function intersectsWith<T>(input: T[] | ObservableInput<T[]>, predicate?: PredicateFn<T>): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    input instanceof Observable
      ? input.pipe(switchMap((inputFromSource) => source.pipe(map(mapIntersectsWith(inputFromSource, predicate)))))
      : source.pipe(map(mapIntersectsWith(input as T[], predicate)));
}

export { intersectsWith };
