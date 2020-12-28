/**
 * @packageDocumentation
 * @module Math
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the hyperbolic cosine value of the source number using
 * Math.cos
 *
 * @category Math Cos
 *
 * @example
 * Returns the hyperbolic cosine of the source number
 * ```ts
 * const input = [-2, -1, 0, 1, 2];
 * from(input).pipe(cosh()).subscribe()
 * ```
 * Output: `3.762..., 1.543..., 1, 1.543..., 3.762...`
 *
 * @returns Observable that emits the hyperbolic cosine value of the source radian number
 */
export function cosh(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(map((value) => Math.cosh(value)));
}
