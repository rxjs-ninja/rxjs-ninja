/**
 * @packageDocumentation
 * @module Number
 */
import { isObservable, MonoTypeOperatorFunction, Observable, ObservableInput, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Returns an Observable that emits a number that is the subtraction of the source number with input number
 *
 * @category Math
 *
 * @param input The number to subtract to the source value
 *
 * @example Returns a number that is the subtract of source and input
 * ```ts
 * const input = [2, 3, 4, 5, 6];
 * from(input).pipe(sub(3)).subscribe();
 * ```
 * Output: `-1, 0, 1, 2, 3`
 *
 * @returns Observable that emits a number that is the subtraction of source and input
 */
export function sub(input: number | ObservableInput<number>): MonoTypeOperatorFunction<number> {
  return (source) =>
    ((isObservable(input) ? input : of(input)) as Observable<number>).pipe(
      switchMap((inputValue) => source.pipe(map((value) => value - inputValue))),
    );
}
