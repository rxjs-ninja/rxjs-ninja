/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';
import { ReduceFn } from '../types/generic-methods';

/**
 * Returns an Observable value from `Array.prototype.reduceRight` over the source Array or Set.
 *
 * @category Modify
 *
 * @typeParam T Item type contained in the source
 * @typeParam K Accumulator type returned by the reducer
 *
 * @param reducer Function invoked for each element (right to left)
 * @param seed Initial accumulator value
 *
 * @returns An Observable that emits the reduced value
 */
export function reduceRight<T extends unknown, K extends unknown>(
  reducer: ReduceFn<T, K>,
  seed: Subscribable<K> | K,
): OperatorFunction<Iterable<T>, K> {
  const seed$ = createOrReturnObservable(seed);
  return (source) =>
    source.pipe(
      withLatestFrom(seed$),
      map(([value, seedValue]) => [...value].reduceRight(reducer, seedValue)),
    );
}
