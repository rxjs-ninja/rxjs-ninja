/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the addition of the source number with input number
 *
 * @category Math
 *
 * @param input The number to add to the source value
 *
 * @example Returns a number that is the addition of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(add(3)).subscribe();
 * ```
 * Output: `5, 6, 7, 8, 9`
 *
 * @returns Observable that emits a number that is the addition of source and input
 */
export function add(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  return (source) =>
    source.pipe(
      withLatestFrom((isObservable(input) ? input : of(input)) as Observable<number>),
      map(([value, inputValue]) => value + inputValue),
    );
}
