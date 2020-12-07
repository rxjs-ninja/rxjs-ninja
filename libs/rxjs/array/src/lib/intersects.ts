/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';
import { mapIntersection } from '../utils/intersects';

/**
 * Returns an Observable array containing values that are intersecting between a Observable source array and the passed input array.
 *
 * An optional [[MapFn]] can be used to convert values for easier comparison - for example when comparing string
 * you can make them lowercase to ensure comparison regardless of input case.
 *
 * @typeParam T The type of data in the input array
 *
 * @param input An Array or Observable array of values to compare the source Observable array against
 * @param mapFn Optional function that can map the values of array for comparison such as upper/lower case
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(['a', 'c']))
 *  subscribe(); // ['a']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(of(['a', 'c'])))
 *  subscribe(); // ['a']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(['A', 'C'], (value) => value.toUpperCase()))
 *  subscribe(); // ['a']
 * ```
 *
 * @example
 * ```ts
 * of(['a', 'b', 'd'])
 *  .pipe(intersects(of(['A', 'C']), (value) => value.toUpperCase()))
 *  subscribe(); // ['a']
 * ```
 *
 * @returns An Observable that emits an array containing the intersection between source and input array
 * @category Array Intersection
 */
export function intersects<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  mapFn?: MapFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(switchMap((value) => source.pipe(map(mapIntersection(value, mapFn)))))
      : source.pipe(map(mapIntersection(input as T[], mapFn)));
}
