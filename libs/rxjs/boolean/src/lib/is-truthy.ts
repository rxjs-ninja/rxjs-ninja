/**
 * @packageDocumentation
 * @module Boolean
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable boolean for whether each source value is truthy (`Boolean(value)`).
 *
 * @category Query
 *
 *
 * @example
 * Test truthiness of each emission
 * ```ts
 * of(true, 0, '').pipe(isTruthy()).subscribe();
 * ```
 * Output: `true, false, false`
 * @returns Observable that emits whether the value is truthy
 */
export function isTruthy(): OperatorFunction<unknown, boolean> {
  return (source) => source.pipe(map((value) => Boolean(value)));
}
