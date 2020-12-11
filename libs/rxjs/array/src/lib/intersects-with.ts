/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';
import { mapIntersectsWith } from '../utils/intersects';

/**
 * Returns an Observable array containing values that are intersection between a Observable source array and the passed
 * input array.
 *
 * @category Array Intersection
 *
 * @remarks This operator will return duplicate items in arrays
 *
 * @see The [[intersects]] operator can be used with a mapping method instead of a predicate method
 *
 * @typeParam T Type of item in the input array
 *
 * @param input An Array or Observable array of values to compare the source Observable array against
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Returns the intersection between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersectsWith(['a', 'd'])).subscribe();
 * ```
 * Output: `'a', 'd', 'a'`
 *
 * @example
 * Returns the intersection between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersectsWith(of(['a', 'd']))).subscribe();
 * ```
 * Output: `'a', 'd', 'a'`
 *
 * @example
 * Returns the compared intersection between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersectsWith(['A', 'D'], (x, y) => x.toUpperCase() === y))).subscribe();
 * ```
 * Output: `'a', 'd', 'a'`
 *
 * @example
 * Returns the compared intersection between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersectsWith(of(['A', 'D']), (x, y) => x.toUpperCase === y))).subscribe();
 * ```
 * Output: `'a', 'd', 'a'`
 *
 * @returns An Observable that emits an array of the intersection of input and source arrays.
 */
export function intersectsWith<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  predicate?: PredicateFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(concatMap((inputFromSource) => source.pipe(map(mapIntersectsWith(inputFromSource, predicate)))))
      : source.pipe(map(mapIntersectsWith(input as T[], predicate)));
}
