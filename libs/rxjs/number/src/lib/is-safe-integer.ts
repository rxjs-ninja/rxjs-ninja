/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value when a source number has precision safety using Number.isSafeInteger
 *
 * @category Number Query
 *
 * @see The [[filterIsSafeInteger]] operator returns the number value
 *
 * @example
 * Return a boolean if a number does not have percision safety
 * ```ts
 * // `Math.pow(2, 53)` is not within the safe integer range
 * const input = [-10, -2.3, 0, 1, 2, 3.14, Math.pow(2, 53) - 1, Math.pow(2, 53), Infinity];
 * from(input).pipe(isSafeInteger()).subscribe()
 * ```
 * Output: `true, false, true, true, true, false, true, false, false`
 *
 * @returns Observable that emits a boolean value of a number has precision safety
 */
export function isSafeInteger(): OperatorFunction<number, boolean> {
  return (source: Observable<number>) => source.pipe(map((value) => Number.isSafeInteger(value)));
}
