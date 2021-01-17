/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a formatted string value from a source number using Number.toPrecision.
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
 * @category Formatting
 */
export function toPrecision(precision: number | ObservableInput<number>): OperatorFunction<number, string> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(precision) ? precision : of(precision)) as Observable<number>),
      map<[number, number], string>(([value, inputValue]) => value.toPrecision(inputValue)),
    );
}
