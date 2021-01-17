/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a formatted string value from a source number using Number.toString.
 *
 * @param radix The base number to format to. Default is `10`.
 *
 * @example Return string values of numbers using base `10` conversion
 * ```ts
 * const input = [1, 2, 3.14, 42];
 * from(input).pipe(toString()).subscribe();
 * ```
 * Output: `'1', '2', '3.14', '42'`
 *
 * @example Return string values of numbers using base `16` conversion
 * ```ts
 * const input = [8, 16, 32, 64];
 * from(input).pipe(toString(16)).subscribe();
 * ```
 * Output: `'8', '10', '20', '40'`
 *
 * @returns Observable that emits a formatted string from a source number and passed `radix` value
 * @category Formatting
 */
export function toString(radix: number | ObservableInput<number> = 10): OperatorFunction<number, string> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(radix) ? radix : of(radix)) as Observable<number>),
      map<[number, number], string>(([value, inputValue]) => value.toString(inputValue)),
    );
}
