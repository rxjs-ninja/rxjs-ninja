/**
 * @packageDocumentation
 * @module Math
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the hyperbolic arc-cosine (in radians) value of the source number
 * using Math.acosh
 *
 * @category Math Cos
 *
 * @example
 * Returns the hyperbolic arc-cosine of the source number
 * ```ts
 * const input = [-1, 0, 1, 2, 3];
 * from(input).pipe(acosh()).subscribe()
 * ```
 * Output: `NaN, NaN, 0, 1.316..., 1.762...`
 *
 * @returns Observable that emits the hyperbolic arc-cosine (in radians) value of the source number
 */
export function acosh(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(map((value) => Math.acosh(value)));
}
