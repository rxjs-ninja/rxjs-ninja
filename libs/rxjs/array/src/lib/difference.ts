/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { MapFn } from '../types/generic-methods';
import { mapDifference } from '../utils/difference';

/**
 * Returns an Observable array containing values that are difference between a Observable source array and the passed input array.
 *
 * @category Compare
 *
 * @remarks This uses `Set` to do comparisons with and will remove duplicates
 *
 * @see The [[differenceWith]] operator can be used with a predicate method instead of a mapping method
 *
 * @typeParam T The type of data in the input array
 *
 * @param input An Array or Observable array of values to compare the source Observable array against
 * @param mapFn Optional [[MapFn]] function that can map the values of array for comparison such as upper/lower case
 *
 * @example
 * Returns the difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['a', 'c'])).subscribe();
 * ```
 * Output: `'b', 'd'`
 *
 * @example
 * Returns the difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(of(['a', 'c']))).subscribe();
 * ```
 * Output: `'b', 'd'`
 *
 * @example
 * Returns the compared difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['A', 'C'], (value) => value.toUpperCase())).subscribe();
 * ```
 * Output: `'b', 'd'`
 *
 * @example
 * Returns the compared difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(of(['A', 'C'], , (value) => value.toUpperCase()))).subscribe();
 * ```
 * Output: `'b', 'd'`
 *
 * @returns An Observable that emits an Array which contains the difference between Observable source and input array.
 */
export function difference<T extends unknown>(
  input: T[] | ObservableInput<T[]>,
  mapFn?: MapFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(concatMap((value) => source.pipe(map(mapDifference(value, mapFn)))))
      : source.pipe(map(mapDifference(input as T[], mapFn)));
}
