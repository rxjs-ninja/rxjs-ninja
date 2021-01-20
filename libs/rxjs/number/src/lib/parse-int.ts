/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/number/src/utils/internal';

/**
 * Returns an Observable that emits a number from a source string using Number.parseInt.
 * By default this operator removes `NaN` values but can optionally be set to return them
 *
 * @param radix The number base to convert from. Default is base `10`
 *
 * @example Return only parsed integer values using base `10`
 * ```ts
 * const input = ['RxJS', '-2.3', '0', '1', '2', '3.14', 'Infinity'];
 * from(input).pipe(parseInt()).subscribe();
 * ```
 * Output: `-2, 0, 1, 2, 3`
 *
 * @example Return parsed integer values and `NaN` values using base `10`
 * ```ts
 * const input = ['RxJS', '-2.3', '0', '1', '2', '3.14', 'Infinity'];
 * from(input).pipe(parseInt(10, true)).subscribe();
 * ```
 * Output: `NaN, -2, 0, 1, 2, 3, NaN`
 *
 * @example Return parsed integer values using base `16`
 * ```ts
 * const input = ['1', 'ff', '40'];
 * from(input).pipe(parseInt(16)).subscribe();
 * ```
 * Output: `1, 255, 64`
 *
 * @returns Observable that emits a number from source parsed string, optionally returns `NaN` values
 * @category Parsing
 */
export function parseInt(radix: Subscribable<number> | number = 10): OperatorFunction<string, number> {
  const radix$ = createOrReturnObservable(radix);
  return (source) =>
    source.pipe(
      withLatestFrom(radix$),
      map(([value, inputValue]) => Number.parseInt(value, inputValue)),
    );
}
