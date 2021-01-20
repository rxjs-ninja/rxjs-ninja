/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value when a source number is a a valid finite floating point number
 *
 * @category Query
 *
 * @see The [[filterIsFloat]] operator returns the number value
 *
 * @example
 * Return boolean for floating point numbers
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(isFloat()).subscribe();
 * ```
 * Output: `false, true, false, false, false, true, true, false, false, false`
 *
 * @returns Observable that emits a boolean of a source number is a valid finite floating point
 */
export function isFloat(): OperatorFunction<number, boolean> {
  return (source) =>
    source.pipe(map((value) => !Number.isNaN(value) && Number.isFinite(value) && !Number.isInteger(value)));
}
