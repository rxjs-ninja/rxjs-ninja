/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a formatted string value from a source number using Number.toPrecision.
 *
 * @category Formatting
 *
 * @param precision The number of decimal places to format the precision to.
 *
 * @example Return a string of numbers formatted to a precision of 4 places
 * ```ts
 * const input = [123.456, 0.004, 1.23e5];
 * from(input).pipe(toPrecision(4)).subscribe();
 * ```
 * Output: `'123.5', '0.004000', '1.230e+5'`
 *
 * @returns Observable that emits a formatted string from a source number
 */
export function toPrecision(precision: Subscribable<number> | number): OperatorFunction<number, string> {
  const precision$ = createOrReturnObservable(precision);
  return (source) =>
    source.pipe(
      withLatestFrom(precision$),
      map(([value, precisionValue]) => value.toPrecision(precisionValue)),
    );
}
