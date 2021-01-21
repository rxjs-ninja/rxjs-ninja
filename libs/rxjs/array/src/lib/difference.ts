/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an `Array` containing unique values from the source that are not in the `compare`
 * parameter
 *
 * @category Filter
 *
 * @see Operator [[differenceAll]] when you want to get all differences in both source and input array
 * @see Operator [[filterDifference]] when you want to emit a result with duplicate values
 *
 * @typeParam T Type of value contained in the source `Array`/`Set`
 *
 * @param compare `Array` or `Set` value to compare the source value with
 *
 * @example
 * Returns values from the source array not contained in the `compare` array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['a', 'c'])).subscribe();
 * ```
 * Output: `['b', 'd']`
 *
 * @returns Observable that emits an `Array` containing items from the source not in the comparison value
 */
export function difference<T extends unknown>(
  compare: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const compare$ = createOrReturnObservable(compare);
  return (source) =>
    source.pipe(
      withLatestFrom(compare$),
      map(([value, compareValue]) => [new Set(value), new Set(compareValue)]),
      map(([value, compareValue]) => [...value].filter((x) => !compareValue.has(x))),
    );
}
