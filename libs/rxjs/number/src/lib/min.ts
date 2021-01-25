/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits the minimum number value from an Iterable of numbers
 *
 * @category Distribution
 *
 * @example
 * Return the min of the source number Array
 * ```ts
 * const source$ = from([ [1, 2, 3], [10, 15, 8], [5, 10, 100] ]);
 *
 * source$.pipe(min()).subscribe();
 * ```
 * Output: `1, 8, 5`
 *
 * @returns Observable that emits a number that is the minimum value in the source Iterable
 */
export function min(): OperatorFunction<Iterable<number>, number> {
  return (source) => source.pipe(map((value) => [...value].reduce((a, b) => Math.min(a, b))));
}
