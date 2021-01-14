/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number from a source hex using Number.parseInt.
 * By default this operator removes `NaN` values but can optionally be set to return them
 *
 * @param returnNaN Optionally return `NaN` values instead of filtering
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
 * @category Number Parsing
 */
export function parseHex(returnNaN?: boolean): OperatorFunction<string, number> {
  return (source: Observable<string>) => {
    const result$ = source.pipe(map((value) => Number.parseInt(value, 16)));
    return returnNaN ? result$ : result$.pipe(filter((value) => !isNaN(value)));
  };
}
