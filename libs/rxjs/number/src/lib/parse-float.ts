/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number from a source string using Number.parseFloat.
 *
 * @category Parse
 *
 * @example Return only parsed number values using base `10`
 * ```ts
 * const input = ['RxJS', '-2.3', '0', '1', '2', '3.14', 'Infinity'];
 * from(input).pipe(parseFloat()).subscribe();
 * ```
 * Output: `-2.3, 0, 1, 2, 3.14`
 *
 * @returns Observable that emits a number from source parsed string
 */
export function parseFloat(): OperatorFunction<string, number> {
  return (source) => source.pipe(map((value) => Number.parseFloat(value)));
}
