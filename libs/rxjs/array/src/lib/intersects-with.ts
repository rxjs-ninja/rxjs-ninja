/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, ObservableInput, OperatorFunction } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';
import { mapIntersectsWith } from '../utils/intersects';

/**
 * Returns an Observable array containing values that are intersection between a Observable source array and the passed
 * input array.
 *
 * @category Compare
 *
 * @remarks This operator will return duplicate items in arrays
 *
 * @see The [[intersects]] operator can be used with a mapping method instead of a predicate method
 *
 * @typeParam T The input type of the source Array or Set
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
export function intersectsWith<T extends unknown>(
  input: T[] | Set<T> | ObservableInput<T[] | Set<T>>,
  predicate?: PredicateFn<T>,
): OperatorFunction<T[] | Set<T>, T[]> {
  return (source) =>
    isObservable<T[] | Set<T>>(input)
      ? input.pipe(
          concatMap(([...inputValue]) =>
            source.pipe(map(([...value]) => mapIntersectsWith(inputValue, predicate)(value))),
          ),
        )
      : source.pipe(map(([...value]) => mapIntersectsWith([...(input as T[])], predicate)(value)));
}
