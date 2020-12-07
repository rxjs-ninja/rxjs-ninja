/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits booleans about values from a source that fall outside the passed `min` and `max` range,
 * excluding the range numbers.  To emit a boolean for numbers including the `min` and `max` set `includeBoundingParameters` to `true`.
 *
 * @see To get numbers outside of a range use [[filterOutOfRange]]
 *
 * @param min The minimum number for the range
 * @param max The maximum number for the range
 * @param includeBoundingParameters Optionally include the `min` and `max` values in the Observable
 *
 * @example Returns a boolean value if the number is out the range including the `min` and `max`
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(outOfRange(0, 10)).subscribe();
 * ```
 * Output: `true, true, true, false, false, false, false, true, true, true`
 *
 * @example Returns a boolean value if the number is out the range excluding the `min` and `max`
 * ```ts
 * const input = [-10, -2.3, 0, 1, 2, 3.14, 4.2, 10, 11, 42];
 * from(input).pipe(outOfRange(0, 10, true)).subscribe();
 * ```
 * Output: `true, true, false, false, false, false, false, false, true, true`
 *
 * @returns Observable that emits a boolean if the source number falls outside the passed `min` and `max` range
 * @category Number Query
 */
export function outOfRange(
  min: number,
  max: number,
  includeBoundingParameters?: boolean,
): OperatorFunction<number, boolean> {
  return (source: Observable<number>) =>
    source.pipe(
      map((value) => (includeBoundingParameters ? value <= min || value >= max : value < min || value > max)),
    );
}
