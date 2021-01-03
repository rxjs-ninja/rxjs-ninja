/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number from a source string using Number.parseFloat.
 * By default this operator removes `NaN` values but can optionally be set to return them
 *
 * @param returnNaN Optionally return `NaN` values instead of filtering
 *
 * @example Return only parsed number values using base `10`
 * ```ts
 * const input = ['RxJS', '-2.3', '0', '1', '2', '3.14', 'Infinity'];
 * from(input).pipe(parseFloat()).subscribe();
 * ```
 * Output: `-2.3, 0, 1, 2, 3.14`
 *
 * @example Return parsed number values and `NaN` values using base `10`
 * ```ts
 * const input = ['RxJS', '-2.3', '0', '1', '2', '3.14', 'Infinity'];
 * from(input).pipe(parseFloat(10, true)).subscribe();
 * ```
 * Output: `NaN, -2.3, 0, 1, 2, 3.14, NaN`
 *
 * @returns Observable that emits a number from source parsed string, optionally returns `NaN` values
 * @category Number Parsing
 */
export function parseFloat(returnNaN?: boolean): OperatorFunction<string, number> {
  return (source: Observable<string>) => {
    const result$ = source.pipe(map((value) => Number.parseFloat(value)));
    return returnNaN ? result$ : result$.pipe(filter((value) => !isNaN(value)));
  };
}
