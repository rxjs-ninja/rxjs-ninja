/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';
import { ReduceFn } from '../types/generic-methods';

/**
 * Returns an Observable value that is the result of applying a reducer over the source Array or Set using
 * Array.prototype.reduce.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the source
 * @typeParam K Accumulator type returned by the reducer
 *
 * @param reducer Function invoked for each element
 * @param seed Optional initial accumulator value
 *
 * @example
 * Sums numeric values in the source array
 * ```ts
 * const input = [1, 2, 3];
 * of(input).pipe(reduce((acc, curr) => acc + curr, 0)).subscribe();
 * ```
 * Output: `6`
 *
 * @returns An Observable that emits the reduced value
 */
export function reduce<T extends unknown, K extends unknown>(
  reducer: ReduceFn<T, K>,
  seed: Subscribable<K> | K,
): OperatorFunction<Iterable<T>, K> {
  const seed$ = createOrReturnObservable(seed);
  return (source) =>
    source.pipe(
      withLatestFrom(seed$),
      map(([value, seedValue]) => [...value].reduce(reducer, seedValue)),
    );
}
