/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits the maximum number value from an Iterable of numbers
 *
 * @category Distribution
 *
 * @example
 * Return the max of the source number Array
 * ```ts
 * const source$ = from([ [1, 2, 3], [10, 15, 8], [5, 10, 100] ]);
 *
 * source$.pipe(max()).subscribe();
 * ```
 * Output: `3, 15, 100`
 *
 * @returns Observable that emits a number that is the maximum value in the source Iterable
 */
export function max(): OperatorFunction<Iterable<number>, number> {
  return (source) => source.pipe(map((value) => [...value].reduce((a, b) => Math.max(a, b))));
}
