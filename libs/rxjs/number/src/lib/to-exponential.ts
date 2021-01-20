/**
 * @packageDocumentation
 * @module Number
 */
import { Observable, OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from 'libs/rxjs/number/src/utils/internal';

/**
 * Returns an Observable that emits a formatted string of a number raised to an exponential power using
 * Number.toExponential.
 *
 * @param exponential The exponential value to raise the number by
 *
 * @example Return a string passed numbers to the exponential of `2`
 * ```ts
 * const input = [-1, 0, 1, 2, 3.4];
 * from(input).pipe(toExponential(2)).subscribe();
 * ```
 * Output: `'-1.00e+0', '0.00e+0', '1.00e+0', '2.30e+0', '3.14e+0'`
 *
 * @returns Observable that emits a formatted string of the exponential number
 * @category Formatting
 */
export function toExponential(exponential: Subscribable<number> | number): OperatorFunction<number, string> {
  const exponential$ = createOrReturnObservable(exponential);
  return (source) =>
    source.pipe(
      withLatestFrom(exponential$),
      map(([value, inputValue]) => value.toExponential(inputValue)),
    );
}
