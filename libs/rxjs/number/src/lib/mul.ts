/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the multiplication of the source number with input number
 *
 * @category Math
 *
 * @param input The number to multiply to the source value
 *
 * @example Returns a number that is the multiplication of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(mul(2)).subscribe();
 * ```
 * Output: `4, 6, 8, 10, 12`
 *
 * @returns Observable that emits a number that is the multiplication of source and input
 */
export function mul(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(input) ? input : of(input)) as Observable<number>),
      map(([value, inputValue]) => value * inputValue),
    );
}
