/**
 * @packageDocumentation
 * @module array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';
import { mapIntersectsWith } from '../utils/intersects';

/**
 * The `intersectsWith` can be used with an [Observable](https://rxjs.dev/api/index/class/Observable) array of values
 * of T, passing in an array or Observable array of values to find the intersection between the two. The returned array of
 * values only contains values from the source Observable
 *
 * An optional [[PredicateFn]] can be passed for more complex types, if none is passed a simple comparison (`===`)
 * will be used to determine the intersection
 *
 * @typeParam T Type of item in the input array
 *
 * @param input Array of items to compare against the source array
 *
 * @example
 * ```ts
 * const input: string[] = ['a', 'e'];
 *
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(input))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: T[]): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable<Array> of items to compare against the source array
 *
 * @example
 * ```ts
 * const input: Observable<string[]> = of(['a', 'e']);
 *
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(input))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: ObservableInput<T[]>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Array of items to compare against the source array
 * @param predicate Function for comparison of arrays
 *
 * @example
 * ```ts
 * const input: string[] = ['A', 'E'];
 * const predicate: PredicateFn<string> = (x, y) => x === y.toLowerCase();
 *
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(input, predicate))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: T[], predicate: PredicateFn<T>): MonoTypeOperatorFunction<T[]>;
/**
 * @param input Observable<Array> of items to compare against the source array
 * @param predicate Function for comparison of arrays
 *
 * @example
 * ```ts
 * const input: Observable<string[]> = of(['A', 'E']);
 * const predicate: PredicateFn<string> = (x, y) => x === y.toLowerCase();
 *
 * of(['a', 'b', 'c', 'd'])
 *  .pipe(intersectsWith(input, predicate))
 *  .subscribe(console.log) // ['a']
 * ```
 *
 * @returns Array of values of intersection between the source and input array
 * @category RxJS Array Intersection
 */
function intersectsWith<T>(input: ObservableInput<T[]>, predicate: PredicateFn<T>): MonoTypeOperatorFunction<T[]>;
function intersectsWith<T>(
  input: T[] | ObservableInput<T[]>,
  predicate?: PredicateFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable(input)
      ? input.pipe(
          switchMap((inputFromSource) => source.pipe(map(mapIntersectsWith(inputFromSource as T[], predicate)))),
        )
      : source.pipe(map(mapIntersectsWith(input as T[], predicate)));
}

export { intersectsWith };
