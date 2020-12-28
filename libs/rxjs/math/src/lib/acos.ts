/**
 * @packageDocumentation
 * @module Math
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the arc-cosine (in radians) value of the source number using
 * Math.acos
 *
 * @category Math Cos
 *
 * @example
 * Returns the arc-cosine of the source number
 * ```ts
 * const input = [-2, -1, 0, 1, 2];
 * from(input).pipe(acos()).subscribe()
 * ```
 * Output: `NaN, 3.141..., 1.570..., 0 , NaN`
 *
 * @returns Observable that emits the arc-cosine (in radians) value of the source number
 */
export function acos(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(map((value) => Math.acos(value)));
}
