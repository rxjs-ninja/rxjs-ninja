/**
 * @packageDocumentation
 * @module Math
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the cosine value of the source number using
 * Math.cos
 *
 * @category Math Cos
 *
 * @example
 * Returns the cosine of the source number
 * ```ts
 * const input = [-2, -1, 0, 1, 2];
 * from(input).pipe(cos()).subscribe()
 * ```
 * Output: `-0.416..., 0.540..., 1, 0.540... , -0.416...`
 *
 * @returns Observable that emits the cosine value of the source radian number
 */
export function cos(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(map((value) => Math.cos(value)));
}
