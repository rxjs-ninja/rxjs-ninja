/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { roundTo } from './round-to';

/**
 * Returns an Observable that emits the calculated mean number value from an Iterable of numbers
 *
 * @category Distribution
 *
 * @param precision Precision to round the result to, default is `3`
 *
 * @example
 * Return the mean of the source number arrays
 * ```ts
 * const source$ = from([ [1, 2, 3], [10, 15, 8], [5, 10, 100] ]);
 *
 * source$.pipe(mean()).subscribe();
 * ```
 * Output: `2, 11, 38.333`
 *
 * @returns Observable that emits a number that is the mean of all values in the source Iterable
 */
export function mean(precision: Subscribable<number> | number = 3): OperatorFunction<Iterable<number>, number> {
  return (source) =>
    source.pipe(
      map(([...value]) => [value.length, value.reduce((a, b) => (a += b))]),
      map(([length, value]) => value / length),
      roundTo(precision),
    );
}
