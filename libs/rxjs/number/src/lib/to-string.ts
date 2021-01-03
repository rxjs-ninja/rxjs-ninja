/**
 * @packageDocumentation
 * @module Number
 */
import { combineLatest, isObservable, Observable, ObservableInput, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

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
 * @category Number Formatting
 */
export function toString(radix: number | ObservableInput<number> = 10): OperatorFunction<number, string> {
  if (isObservable(radix)) {
    return (source: Observable<number>) =>
      combineLatest([source, radix]).pipe(map(([value, _radix]) => value.toString(_radix as number)));
  }
  return (source: Observable<number>) => source.pipe(map((number) => number.toString(radix as number)));
}
