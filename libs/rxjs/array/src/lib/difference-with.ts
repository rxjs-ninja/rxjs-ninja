/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PredicateFn } from '../types/array-compare';
import { mapDifferenceWith } from '../utils/difference';

/**
 * Returns an Observable array containing values that are difference between a Observable source
 * array and the passed input array.
 *
 * An optional [[PredicateFn]] can be used to do different boolean comparison with the difference
 *
 * @typeParam T Type of item in the input array
 *
 * @param input An Array or Observable array of values to compare the source Observable array against
 * @param predicate Optional function to compared the values against

 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'c', 'd'];
 * of(input).pipe(differenceWith(['a', 'c'])).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'c', 'd'];
 * of(input).pipe(differenceWith(of(['a', 'c']))).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'c', 'd'];
 * of(input).pipe(differenceWith(['A', 'C'], (x, y) => x.toUpperCase() === y))).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @example
 * ```ts
 * const input = ['a', 'b', 'c', 'd'];
 * of(input).pipe(differenceWith(of(['A', 'C']), (x, y) => x.toUpperCase === y))).subscribe();
 * // ['b', 'd']
 * ```
 *
 * @returns Array of values of difference between the source and input array
 * @category RxJS Array Difference
 */
export function differenceWith<T = unknown>(
  input: T[] | ObservableInput<T[]>,
  predicate?: PredicateFn<T>,
): MonoTypeOperatorFunction<T[]> {
  return (source: Observable<T[]>) =>
    isObservable<T[]>(input)
      ? input.pipe(switchMap((inputFromSource) => source.pipe(map(mapDifferenceWith(inputFromSource, predicate)))))
      : source.pipe(map(mapDifferenceWith(input as T[], predicate)));
}
