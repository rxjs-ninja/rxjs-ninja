/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an tuple containing two `Array` values, the first contains the difference between
 * the source value and compare `Array`/`Set` and the second array contains the reverse compare
 *
 * @category Filter
 *
 * @see [[difference]] operator for `Array` containing the difference only from the source value
 * @see [[filterDifference]] operator for an `Array` containing differences based on a [[PredicateFn]]
 *
 * @typeParam T Item type contained in the `Array`/`Set`
 *
 * @param compare `Array`/`Set` or Observable value to compare against for the difference
 *
 * @example
 * Returns both differences between the source and array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['a', 'c', 'g'])).subscribe();
 * ```
 * Output: `['b', 'd', 'g']`
 *
 * @returns Observable that emits an `Array` containing items from the source not in the comparison value
 */
export function differenceAll<T extends unknown>(
  compare: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[][]> {
  const compare$ = createOrReturnObservable(compare);
  return (source) =>
    source.pipe(
      withLatestFrom(compare$),
      map(([value, compareValue]) => [new Set(value), new Set(compareValue)]),
      map(([value, compareValue]) => [
        [...value].filter((x) => !compareValue.has(x)),
        [...compareValue].filter((x) => !value.has(x)),
      ]),
    );
}
