/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MapFn } from '../types/array-compare';
import { mapDifference } from '../utils/difference';

/**
 * Returns an Observable array containing values that are difference between a Observable source
 * array and the passed input array.
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
 * const input = ['a', 'b', 'd'];
 * of(input).pipe(difference(['a', 'c'])).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'd'];
 * of(input).pipe(difference(of(['a', 'c']))).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'd'];
 * of(input).pipe(difference(['A', 'C'], (value) => value.toUpperCase())).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'd'];
 * of(input).pipe(difference(of(['A', 'C'], , (value) => value.toUpperCase()))).subscribe(); // ['b', 'd']
 * ```
 *
 * @returns An Observable that emits an array containing the difference between source and input array
 * @category RxJS Array Difference
 */
export function difference<T extends unknown>(
  input: T[] | ObservableInput<T[]>,
  mapFn?: MapFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(switchMap((value) => source.pipe(map(mapDifference(value, mapFn)))))
      : source.pipe(map(mapDifference(input as T[], mapFn)));
}
