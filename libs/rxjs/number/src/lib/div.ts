/**
 * @packageDocumentation
 * @module Number
 */
import { MonoTypeOperatorFunction, of, Subscribable, throwError } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * @private
 * @internal
 */
const ERROR_MESSAGE = `div operator cannot divide by 0`;

/**
 * Returns an Observable that emits a number that is the division of the source number with input number
 *
 * @category Math
 *
 * @param input The number to divide to the source value
 *
 * @remarks If the input value is `0` this operator will throw an error
 *
 * @example Returns a number that is the division of source and input
 * ```ts
 * const input = [4, 10, 12, 18, 20];
 * from(input).pipe(div(2)).subscribe();
 * ```
 * Output: `2, 5, 6, 9, 10`
 *
 * @returns Observable that emits a number that is the division of source and input
 */
export function div(input: Subscribable<number> | number): MonoTypeOperatorFunction<number> {
  const input$ = createOrReturnObservable(input);
  return (source) =>
    source.pipe(
      withLatestFrom(input$),
      switchMap(([value, inputValue]) => (inputValue !== 0 ? of(value / inputValue) : throwError(ERROR_MESSAGE))),
    );
}
