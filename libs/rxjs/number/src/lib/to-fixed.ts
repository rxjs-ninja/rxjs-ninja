/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a formatted string value from a source number using Number.toFixed.
 *
 * @param digits Optional number of digits to fix to, if not passed treated as `0`
 *
 * @example Return a string of a number to fixed position of `2`
 * ```ts
 * const input = [1.8372, 2.12353, 3.14, 42.2];
 * from(input).pipe(toString()).subscribe();
 * ```
 * Output: `'1.834', '2.12', '3.14', '42.20'`
 *
 * @returns Observable that emits a formatted string from a source number to a fixed decimal value
 * @category Number Formatting
 */
export function toFixed(digits?: number | ObservableInput<number>): OperatorFunction<number, string> {
  if (isObservable(digits)) {
    return (source: Observable<number>) =>
      source.pipe(
        withLatestFrom(digits),
        map(([value, _digits]) => value.toFixed(_digits as number)),
      );
  }
  return (source: Observable<number>) => source.pipe(map((number) => number.toFixed(digits as number)));
}
