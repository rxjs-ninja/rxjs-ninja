/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an tuple containing two Array both containing differences in the source and
 * `compare` value. The first array contains items from the source not contained in `compare` and the second values
 * from `compare` not in the source.
 *
 * @category Filter
 *
 * @see Operator [[difference]] for only the values from the source
 * @see Operator [[filterDifference]] when you want to emit a result with duplicate values
 *
 * @typeParam T Type of value contained in the source Array or Set
 *
 * @param compare Array or Set value to compare the source value with
 *
 * @example
 * Returns both differences between the source and array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(differenceAll(['a', 'c', 'g'])).subscribe();
 * ```
 * Output: `[ ['b', 'd'], ['g'] ]`
 *
 * @returns Observable that emits an tuple containing two Array values with the source difference and input
 *   difference
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
