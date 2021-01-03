/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

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
 * @category Number Formatting
 */
export function toPrecision(precision: number | ObservableInput<number>): OperatorFunction<number, string> {
  if (isObservable(precision)) {
    return (source) =>
      combineLatest([source, precision]).pipe(map(([value, _precision]) => value.toPrecision(_precision as number)));
  }
  return (source: Observable<number>) => source.pipe(map((value) => value.toPrecision(precision as number)));
}
