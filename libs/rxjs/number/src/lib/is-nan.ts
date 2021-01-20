/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value when a source number is a `NaN` value from Number.isNaN.
 *
 * @category Query
 *
 * @see The [[filterNaN]] operator returns numbers excluding `NaN` values
 *
 * @example
 * Return a boolean if a number is a `NaN` value
 * ```ts
 * const input = ['Ninja', 1, 2, NaN, 3.14, undefined];
 * from(input).pipe(isNaN()).subscribe();
 * ```
 * Output: `true, false, false, true, false, true`
 *
 * @returns Observable that emits a boolean value of a number being valid or `NaN`
 */
export function isNaN(): OperatorFunction<number, boolean> {
  return (source) => source.pipe(map((value) => Number.isNaN(value)));
}
