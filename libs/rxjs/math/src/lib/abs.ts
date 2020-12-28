/**
 * @packageDocumentation
 * @module Math
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the absolute value of the source number using Math.abs
 *
 * @category Math Value
 *
 * @example
 * Returns the absolute value of the source number
 * ```ts
 * const input = [-2, -1, 0, 1, 5.4444444444444444];
 * from(input).pipe(abs()).subscribe()
 * ```
 * Output: `2, 1, 0, 1, 5.444444444444445`
 *
 * @returns Observable that emits the absolute value of the source number
 */
export function abs(): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(map((value) => Math.abs(value)));
}
