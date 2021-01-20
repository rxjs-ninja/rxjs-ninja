/**
 * @packageDocumentation
 * @module Number
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits a formatted string value from a source number using Number.toFixed
 *
 * @category Formatting
 *
 * @param digits Optional number of digits to fix to, if not passed treated as `0`
 *
 * @example Return a string of a number to fixed position of `2`
 * ```ts
 * const input = [1.8372, 2.12353, 3.14, 42.2];
 * from(input).pipe(toFixed(2)).subscribe();
 * ```
 * Output: `'1.834', '2.12', '3.14', '42.20'`
 *
 * @returns Observable that emits a formatted string from a source number to a fixed decimal value

 */
export function toFixed(digits?: Subscribable<number> | number): OperatorFunction<number, string> {
  const digits$ = createOrReturnObservable(digits);
  return (source) =>
    source.pipe(
      withLatestFrom(digits$),
      map(([value, inputValue]) => value.toFixed(inputValue)),
    );
}
