/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of, throwError } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

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
export function div(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(input) ? input : of(input)) as Observable<number>),
      switchMap(([value, inputValue]) => {
        if (inputValue === 0) {
          return throwError('Cannot divide by 0');
        }
        return of(value / inputValue);
      }),
    );
}
