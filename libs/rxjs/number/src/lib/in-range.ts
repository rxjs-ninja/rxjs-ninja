/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits booleans about values from a source that fall within the passed `min` and `max`
 * range, including the range numbers.  To emit a boolean for numbers only between the `min` and `max` set
 * `excludeBoundingValues` to `true`.
 *
 * @category Query
 *
 * @see The [[filterInRange]] operator returns the number value
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param excludeBoundingValues Optionally filter the `min` and `max` values from the Observable
 *
 * @example
 * Returns a boolean value if the number is in the range
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(inRange(0, 10)).subscribe();
 * ```
 * Output: `false, false, true, true, true, true, true, true, false, false`
 *
 * @example
 * Returns a boolean value if the number is in the range excluding the `min` and `max`
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(inRange(0, 10, true)).subscribe();
 * ```
 * Output: `false, false, false, true, true, true, true, false, false, false`
 *
 * @returns Observable that emits a boolean if the source number falls within the passed `min` and `max` range
 */
export function inRange(min: number, max: number, excludeBoundingValues?: boolean): OperatorFunction<number, boolean> {
  return (source) =>
    source.pipe(map((value) => (excludeBoundingValues ? value > min && value < max : value >= min && value <= max)));
}
