/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a boolean value when a source number is valid and not `NaN`, checked using
 * Number.isNaN
 *
 * @category Query
 *
 * @remarks This is mostly for convenience of getting truthy values that are valid for numbers without flipping the
 *   value os `isNaN`
 *
 * @see The [[filterIsNotNaN]] operator returns the number value
 *
 * @example
 * Return a boolean if a number is not `NaN` value
 * ```ts
 * const input = ['Ninja', 1, 2, NaN, 3.14, undefined];
 * from(input).pipe(isNotNaN()).subscribe();
 * ```
 * Output: `false, true, true, false, true, false`
 *
 * @returns Observable that emits a boolean value of a number being valid or `NaN`
 */
export function isNotNaN(): OperatorFunction<number, boolean> {
  return (source) => source.pipe(map((value) => !Number.isNaN(value)));
}
