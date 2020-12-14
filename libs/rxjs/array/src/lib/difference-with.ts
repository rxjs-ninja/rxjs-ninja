/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';
import { mapDifferenceWith } from '../utils/difference';

/**
 * Returns an Observable array containing values that are difference between a Observable source array and the passed input array.
 *
 * @category Array Compare
 *
 * @remarks This operator will return duplicate items in arrays
 *
 * @see The [[difference]] operator can be used with a mapping method instead of a predicate method
 *
 * @typeParam T Type of item in the input array
 *
 * @param input An Array or Observable array of values to compare the source Observable array against
 * @param predicate Optional [[PredicateFn]] function to compared the values against
 *
 * @example
 * Returns the difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(differenceWith(['a', 'c'])).subscribe();
 * ```
 * Output: `'b', 'd', 'b'`
 *
 * @example
 * Returns the difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(differenceWith(of(['a', 'c']))).subscribe();
 * ```
 * Output: `'b', 'd', 'b'`
 *
 * @example
 * Returns the compared difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(differenceWith(['A', 'C'], (x, y) => x.toUpperCase() === y))).subscribe();
 * ```
 * Output: `'b', 'd', 'b'`
 *
 * @example
 * Returns the compared difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(differenceWith(of(['A', 'C']), (x, y) => x.toUpperCase === y))).subscribe();
 * ```
 * Output: `'b', 'd', 'b'`
 *
 * @returns An Observable that emits an Array which contains the difference between Observable source and input array.
 */
export function differenceWith<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  predicate?: PredicateFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(concatMap((inputFromSource) => source.pipe(map(mapDifferenceWith(inputFromSource, predicate)))))
      : source.pipe(map(mapDifferenceWith(input as T[], predicate)));
}
