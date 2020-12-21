/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';
import { mapIntersection } from '../utils/intersects';

/**
 * Returns an Observable array containing values that are intersecting between a Observable source
 * array and the passed input array.
 *
 * @category Array Compare
 *
 * @remarks This uses `Set` to do comparisons with and will remove duplicates
 *
 * @see The [[intersectsWith]] operator can be used with a predicate method instead of a mapping method
 *
 * @typeParam T The type of data in the input array
 *
 * @param input An Array or Observable array of values to compare the source Observable array against
 * @param mapFn Optional [[MapFn]] function that can map the values of array for comparison such as upper/lower case
 *
 * @example
 * Returns the intersection between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersects(['a', 'd'])).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @example
 * Returns the intersection between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersects(of(['a', 'd']))).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @example
 * Returns the compared intersection between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersects(['A', 'D'], (value) => value.toUpperCase())).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @example
 * Returns the compared intersection between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(intersects(of(['A', 'D'], , (value) => value.toUpperCase()))).subscribe();
 * ```
 * Output: `'a', 'd'`
 *
 * @returns An Observable that emits an array of the intersection of input and source arrays.
 */
export function intersects<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  mapFn?: MapFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(concatMap((value) => source.pipe(map(mapIntersection(value, mapFn)))))
      : source.pipe(map(mapIntersection(input as T[], mapFn)));
}
