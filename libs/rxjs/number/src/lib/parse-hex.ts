/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number from a source hex using Number.parseInt.
 * By default this operator removes `NaN` values but can optionally be set to return them
 *
 * @example Return only parsed hex values
 * ```ts
 * const input = ['RxJS', 'ff', '00', '1b', '23', 'c89bb'];
 * from(input).pipe(parseHex()).subscribe();
 * ```
 * Output: `255, 0, 27, 25, 821691`
 *
 * @example Return parsed integer values and `NaN` values using base `10`
 * ```ts
 * const input = ['RxJS', 'ff', '00', '1b', '23', 'c89bb'];
 * from(input).pipe(parseHex(true)).subscribe();
 * ```
 * Output: `NaN, 255, 0, 27, 25, 821691`
 *
 * @returns Observable that emits a number from source hex value, optionally returns `NaN` values
 * @category Parsing
 */
export function parseHex(): OperatorFunction<string, number> {
  return (source) => source.pipe(map((value) => Number.parseInt(value, 16)));
}
