/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value when a source number is an integer checked with Number.isInteger
 *
 * @category Query
 *
 * @see The [[filterIsInteger]] operator returns the number value
 *
 * @example
 * Return booleans for values that are integer values
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(isInteger()).subscribe()
 * ```
 * Output: `true, false, true, true, true, false, false, true, true, true`
 *
 * @returns Observable that emits a boolean of a source number being an integer
 */
export function isInteger(): OperatorFunction<number, boolean> {
  return (source) => source.pipe(map((value) => Number.isInteger(value)));
}
